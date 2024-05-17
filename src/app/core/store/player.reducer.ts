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
    players: [...players],
    error: null,
  })),
  on(PlayerActions.loadPlayersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(PlayerActions.addFavorite, (state, { player }) => {
    const updatedFavorites = [...state.favorites, player];
    saveFavoritesToLocalStorage(updatedFavorites);
    return {
      ...state,
      favorites: updatedFavorites,
    };
  }),
  on(PlayerActions.removeFavorite, (state, { player }) => {
    const updatedFavorites = state.favorites.filter(fav => fav.id !== player.id);
    saveFavoritesToLocalStorage(updatedFavorites);
    return {
      ...state,
      favorites: updatedFavorites,
    };
  })
);
