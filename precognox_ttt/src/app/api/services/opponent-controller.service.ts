/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class OpponentControllerService {

  apiUrl: string = 'http://localhost:5000/opponent-move';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getOpponentMove(playerToMove: '1' | '2', board: string): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {params: {player: playerToMove, board: board}});
  }

}
