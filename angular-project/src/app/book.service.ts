import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Book } from './book';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://localhost:8080/books';  // URL de l'API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getBooks(): Observable<Book[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('BookService: fetched films');
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getBooks', []))
      );
  }

  /** GET book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    // TODO: send the message _after_ fetching the film
    this.messageService.add(`FilmService: fetched film id=${id}`);
    return this.http.get<Book>(this.booksUrl + '/' + id)
      .pipe(
        catchError(this.handleError<Book>('getFilm', null))
      );
  }

  /** POST: add a new book to the server */
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, this.httpOptions).pipe(
      tap((newBook: Book) => this.log(`added film w/ id=${newBook.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** DELETE: delete the book from the server */
  deleteFilm(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  /** PUT: update the book on the server */
  updateFilm(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, this.httpOptions).pipe(
      tap(_ => this.log(`updated film id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  /* GET books whose name contains search term */
  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // if not search term, return empty book array.
      return of([]);
    }
    return this.http.get<Book[]>(`${this.booksUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found books matching "${term}"`) :
         this.log(`no books matching "${term}"`)),
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

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
