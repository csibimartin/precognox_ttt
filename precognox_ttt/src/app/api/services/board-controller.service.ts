/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Board} from "../models/board";

@Injectable({providedIn: 'root'})
export class BoardControllerService {

  apiUrl: string = 'http://localhost:5000/boards';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getBoards(name?: string) {
    let options = {};
    if (name) {
      options = {params: {name: name}};
    }
    return this.http.get(`${this.apiUrl}`, options);
  }

  getBoard(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createBoard(data: Board): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  updateBoard(id: number, data: Board): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http
      .patch(API_URL, data, {headers: this.headers})
      .pipe(catchError(this.error));
  }

  deleteBoard(id: number): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
