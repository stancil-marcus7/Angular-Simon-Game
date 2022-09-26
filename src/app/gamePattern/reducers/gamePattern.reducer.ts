import {
  resetGame,
  toggleStrictMode,
  addNewColorToGamePattern,
  addNewColorToUserPattern,
  increaseLevel,
  emptyUserPattern,
} from '../actions/gamePattern.action';
import { createReducer, on } from '@ngrx/store';
import { GamePattern } from 'src/app/interfaces/gamePattern';

export const initialState: GamePattern = {
  gamePattern: [],
  userPattern: [],
  level: 0,
  gameStarted: false,
  strictMode: false,
};

export const gamePatternReducer = createReducer(
  initialState,
  on(addNewColorToGamePattern, (state, { color }) => ({
    ...state,
    gamePattern: [...state.gamePattern, color],
  })),
  on(addNewColorToUserPattern, (state, { color }) => ({
    ...state,
    userPattern: [...state.userPattern, color],
  })),
  on(emptyUserPattern, (state) => ({
    ...state,
    userPattern: [],
  })),
  on(increaseLevel, (state) => ({
    ...state,
    level: state.level + 1,
  })),
  on(resetGame, (state) => ({
    ...state,
    gamePattern: [],
    userPattern: [],
    level: 0,
    gameStarted: false,
  })),
  on(toggleStrictMode, (state) => ({
    ...state,
    strictMode: !state.strictMode,
  }))
);
