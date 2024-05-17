import { createReducer, on } from '@ngrx/store';
import { Player } from '../models/player';
import * as PlayerActions from './player.actions';

export interface PlayerState {
  players: Player[];
  favorites: Player[];
  error: string | null;
}

export const initialState: PlayerState = {
  players: [],
  favorites: loadFavoritesFromLocalStorage(),
  error: null,
};

function loadFavoritesFromLocalStorage(): Player[] {
  const favoritesJson = localStorage.getItem('favorites');
  return favoritesJson ? JSON.parse(favoritesJson) : [];
}

function saveFavoritesToLocalStorage(favorites: Player[]): void {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const playerReducer = createReducer(
  initialState,
  on(PlayerActions.loadPlayersSuccess, (state, { players }) => ({
    ...state,
    players,
    error: null,
  })),
  on(PlayerActions.loadPlayersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PlayerActions.addFavorite, (state, { player }) => {
    const favorites = [...state.favorites, player];
    saveFavoritesToLocalStorage(favorites);
    return {
      ...state,
      favorites,
    };
  }),
  on(PlayerActions.removeFavorite, (state, { player }) => {
    const favorites = state.favorites.filter(fav => fav.id !== player.id);
    saveFavoritesToLocalStorage(favorites);
    return {
      ...state,
      favorites,
    };
  }),
  on(PlayerActions.removeAllFavorites, (state) => {
    saveFavoritesToLocalStorage([]);
    return {
      ...state,
      favorites: [],
    };
  })
);
