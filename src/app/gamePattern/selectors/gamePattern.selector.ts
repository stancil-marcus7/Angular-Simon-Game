import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GamePattern } from 'src/app/interfaces/gamePattern';

export const selectGamePattern =
  createFeatureSelector<GamePattern>('gamePatterns');

export const selectGamePatterns = createSelector(
  selectGamePattern,
  (gamePatterns) => gamePatterns
);
