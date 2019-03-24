import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../login/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CategoriesAddComponent } from './categories-add/categories-add.component';
import { CategoriesService } from './categories.service';
import { Category } from './category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private categories: Category[];
  private isAdmin: boolean = false;

  constructor(private authService: AuthService,
    public dialog: MatDialog,
    private categorySvc: CategoriesService,
    private zone: NgZone) {

    this.authService.isAdmin.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  ngOnInit() {
    this.categorySvc.getCategories().subscribe((data) => {
      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Category;
      })
    });
  }

  onClickCategory(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '600px';
    dialogConfig.minWidth = '340px';
    // dialogConfig.data = { category: null };
    const addCategoryDialog = this.dialog.open(CategoriesAddComponent, dialogConfig);

    addCategoryDialog.afterClosed().subscribe(result => {
      this.categorySvc.form.reset();
      console.log('The dialog was closed', result);
    });
  }

}