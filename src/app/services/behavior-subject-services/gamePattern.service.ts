import { initialState } from './../../gamePattern/reducers/gamePattern.reducer';
import { GamePattern } from '../../interfaces/gamePattern';
import { Injectable } from '@angular/core';
import { BehaviorSubject, pluck, Subscription } from 'rxjs';

@Injectable()
export class GamePatternService {
  initialState = {
    gamePattern: [],
    userPattern: [],
    level: 0,
    strictMode: false,
    gameStarted: false,
  };
  private dataSource = new BehaviorSubject<GamePattern>({
    gamePattern: [],
    userPattern: [],
    level: 0,
    strictMode: false,
    gameStarted: false,
  });
  data = this.dataSource.asObservable();

  constructor() {}

  updateUserPattern(color: string) {
    const currentValue = this.returnCurrentValue();
    this.dataSource.next({
      ...currentValue,
      userPattern: [...currentValue.userPattern, color],
    });
  }

  updateGamePattern(color: string) {
    const currentValue = this.returnCurrentValue();
    this.dataSource.next({
      ...currentValue,
      gamePattern: [...currentValue.gamePattern, color],
    });
  }

  emptyGamePattern() {
    const currentValue = this.returnCurrentValue();
    this.dataSource.next({
      ...currentValue,
      gamePattern: [],
    });
  }

  emptyUserPattern() {
    const currentValue = this.returnCurrentValue();
    this.dataSource.next({
      ...currentValue,
      userPattern: [],
    });
  }

  toggleStrictMode(strictMode: boolean) {
    this.resetGame();
    this.dataSource.next({ ...initialState, strictMode });
  }

  updateLevel() {
    const currentValue = this.returnCurrentValue();
    this.dataSource.next({ ...currentValue, level: currentValue.level + 1 });
  }

  updateGameStarted(gameStarted: boolean) {
    const currentValue = this.returnCurrentValue();
    this.dataSource.next({ ...currentValue, gameStarted });
  }

  resetGame() {
    this.dataSource.next(this.initialState);
  }

  returnCurrentValue(): GamePattern {
    return this.dataSource.getValue();
  }
}
