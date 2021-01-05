import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FilmFormComponent } from './film-form/film-form.component';
import { BookFormComponent } from './book-form/book-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'film-detail/:id', component: FilmDetailComponent },
  { path: 'book-detail/:id', component: BookDetailComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'film-form/:id', component: FilmFormComponent },
  { path: 'book-form/:id', component: BookFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
