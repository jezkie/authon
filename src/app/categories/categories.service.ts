import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/';
import { finalize, tap } from 'rxjs/operators';
import { Category } from './category';
import { FileValidator } from '../validator/file-validator';

@Injectable()
export class CategoriesService {
  uploading = new EventEmitter<boolean>(false);

  fileEmpty = new EventEmitter<boolean>(true);

  snapshot: Observable<any>;

  downloadUrl: Observable<string>;

  percentage: Observable<number>;

  task: AngularFireUploadTask;

  form: FormGroup = new FormGroup({
      'category': new FormControl(null, [ Validators.required ]),
      'imgFile': new FormControl('')
  });

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

  getCategories() {
    return this.db.collection('categories').snapshotChanges();
  }

  addCategory() {
    let cat = new Category(this.form.get('category').value, this.form.get('imgFile').value);
    console.log('cat', Object.assign({}, {category: cat.category}, {imgUrl: cat.imgUrl}));
    // return this.db.collection('categories').add(Object.assign({}, {category: cat.category}, {imgUrl: cat.imgUrl}));
  }

  abortSave() {
    const path = this.form.get('imgFile').value;
    console.log('to delete', path)
    if (path) {
      this.storage.storage.refFromURL(path).delete();
    }
    
  }

  uploadImage(event: FileList) {
    const file = event.item(0);
    const path = `categories/${new Date().getTime()}_${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
    }
    const ref = this.storage.ref(path)
    this.task = this.storage.upload(path, file);
    this.uploading.emit(true);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    this.snapshot.pipe(
      finalize(()=>{
        this.downloadUrl = ref.getDownloadURL();
        this.downloadUrl.subscribe(url => {
          this.form.patchValue({
            imgFile: url
          });
          this.uploading.emit(false);
          this.fileEmpty.emit(false);
          console.log('Done uploading.');
        }, (error) => {
          console.error('downloadUrl', error);
        })
      , error => {
        console.error('snapshot', error);
      }})
    ).subscribe((snap)=> {
      console.log('bytes transferred' + snap.bytesTransferred + ' of ' + snap.totalBytes);
    });

  }

  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
  
  populateForm(cat: Category){
    this.form.setValue(cat);
  }

}