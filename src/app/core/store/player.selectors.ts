import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.reducer';

export const selectPlayerState = createFeatureSelector<PlayerState>('players');

export const selectAllPlayers = createSelector(
  selectPlayerState,
  state => state.players
);

export const selectFavorites = createSelector(
  selectPlayerState,
  state => state.favorites
);
