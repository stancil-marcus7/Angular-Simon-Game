import { createAction, props } from '@ngrx/store';

export const addNewColorToGamePattern = createAction(
  `[Game Pattern] Add Color`,
  props<{ color: string }>()
);

export const addNewColorToUserPattern = createAction(
  `[User Pattern] Add Color`,
  props<{ color: string }>()
);

export const emptyUserPattern = createAction(`[User Pattern]`);

export const increaseLevel = createAction('[Level] Increment');

export const resetGame = createAction('[Level] Reset');

export const toggleStrictMode = createAction('[Strict Mode] Toggle');

export const startGame = createAction('[Game] Start');
