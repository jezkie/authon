import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';

const appRoutes = [
  {path: '', component: CategoriesComponent},
  {path: 'categories', component: CategoriesComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }