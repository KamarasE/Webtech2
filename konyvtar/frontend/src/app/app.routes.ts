import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'books/list', component: BookListComponent },
  { path: 'books/add', component: BookAddComponent }
];
