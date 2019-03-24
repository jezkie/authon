import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Category } from '../category';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {
  disableActions: boolean = false;
  fileEmpty: boolean = true;
  
  constructor(public dialogRef: MatDialogRef<CategoriesAddComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Category, 
    private categorySvc: CategoriesService) { }

  ngOnInit() { 
    this.categorySvc.uploading.subscribe((uploading) => {
      this.disableActions = uploading;
    });
    this.categorySvc.fileEmpty.subscribe((empty)=> {
      this.fileEmpty = empty;
    });
  }

  onNoClick(): void {
    this.categorySvc.abortSave();
    this.dialogRef.close(this.data);
  }

  onSave() {
    this.categorySvc.addCategory()
      // .then(res => {
      //   console.log(res);
      // }).catch(err => {
      //   console.error(err);
      // });
    this.dialogRef.close(this.data);
  }
}