import { createAction, props } from '@ngrx/store';
import { Player } from '../models/player';

export const loadPlayers = createAction('[Player List] Load Players');
export const loadPlayersSuccess = createAction('[Player List] Load Players Success', props<{ players: Player[] }>());
export const loadPlayersFailure = createAction('[Player List] Load Players Failure', props<{ error: string }>());

export const addFavorite = createAction('[Player List] Add Favorite', props<{ player: Player }>());
export const removeFavorite = createAction('[Player List] Remove Favorite', props<{ player: Player }>());
