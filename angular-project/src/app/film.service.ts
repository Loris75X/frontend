import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Film } from './film';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private filmsUrl = 'http://localhost:8080/films';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

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

  /** POST: add a new film to the server */
  addFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(this.filmsUrl, film, this.httpOptions)
      .pipe(
        tap((newFilm: Film) => this.log(`added film w/ id=${newFilm.id}`)),
        catchError(this.handleError<Film>('addFilm'))
      );
  }

  /** DELETE: delete the film from the server */
  deleteFilm(film: Film | number): Observable<Film> {
    const id = typeof film === 'number' ? film : film.id;
    const url = `${this.filmsUrl}/${id}`;

    return this.http.delete<Film>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted film id=${id}`)),
      catchError(this.handleError<Film>('deleteFilm'))
    );
  }

  /** PUT: update the Film on the server */
  updateFilm(film: Film): Observable<any> {
    return this.http.put(this.filmsUrl + '/' + film.id, film, this.httpOptions).pipe(
      tap(_ => this.log(`updated film id=${film.id}`)),
      catchError(this.handleError<any>('updateFilm'))
    );
  }

  /* GET films whose name contains search term */
  searchFilms(term: string): Observable<Film[]> {
    if (!term.trim()) {
      // if not search term, return empty book array.
      return of([]);
    }
    return this.http.get<Film[]>(`${this.filmsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found films matching "${term}"`) :
         this.log(`no films matching "${term}"`)),
      catchError(this.handleError<Film[]>('searchFilms', []))
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
