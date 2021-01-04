import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Film } from './film';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private filmsUrl = 'http://localhost:8080/films';  // URL to web api


  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getFilms(): Observable<Film[]> {
    // TODO: send the message _after_ fetching the films
    this.messageService.add('FilmService: fetched films');
    return this.http.get<Film[]>(this.filmsUrl)
      .pipe(
        catchError(this.handleError<Film[]>('getFilms', []))
      );
  }

  getFilm(id: number): Observable<Film> {
   // TODO: send the message _after_ fetching the film
   this.messageService.add(`FilmService: fetched film id=${id}`);
   return this.http.get<Film>(this.filmsUrl + '/' + id)
     .pipe(
       catchError(this.handleError<Film>('getFilm', null))
     );
 }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FilmService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
