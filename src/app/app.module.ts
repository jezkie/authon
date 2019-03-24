import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { MaterialModule } from './material/material.module';

import { AuthService } from './login/services/auth.service';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { LoginComponent } from './login/login/login.component';
import { CategoriesService } from './categories/categories.service';
import { FileValueAccessor } from './util/file-value-accessor';
import { FileValidator } from './validator/file-validator';
import { DataurlConveter } from './util/dataurl-converter';
import { CategoriesItemComponent } from './categories/categories-item/categories-item.component';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    RoutingModule, 
    MaterialModule, 
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFirestoreModule,
    AngularFireStorageModule, 
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent, 
    CategoriesComponent, 
    CategoriesAddComponent, 
    LoginComponent,
    FileValueAccessor, 
    FileValidator, CategoriesItemComponent],
  bootstrap: [AppComponent],
  providers: [
    AuthService, 
    CategoriesService],
  entryComponents: [CategoriesAddComponent]
})
export class AppModule { }
