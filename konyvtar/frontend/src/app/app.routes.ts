import { Routes } from '@angular/router';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookAddComponent } from './books/book-add/book-add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books/list', pathMatch: 'full' },
  { path: 'books/list', component: BookListComponent },
  { path: 'books/add', component: BookAddComponent }
];
