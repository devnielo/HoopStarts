// src/app/core/services/player.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from '../models/player';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = environment.apiUrl;;

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/interview/playerdata`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('An error occurred while fetching player data'));
  }
}
