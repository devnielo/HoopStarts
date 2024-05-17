import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlayerService } from '../services/player.service';
import * as PlayerActions from './player.actions';

@Injectable()
export class PlayerEffects {
  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayers),
      mergeMap(() => {
        console.log('Action received: Load Players');
        return this.playerService.getPlayers().pipe(
          map(players => {
            console.log('Players fetched:', players);
            return PlayerActions.loadPlayersSuccess({ players });
          }),
          catchError(error => {
            console.error('Error in effect:', error);
            return of(PlayerActions.loadPlayersFailure({ error: error.message }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private playerService: PlayerService
  ) {}
}
