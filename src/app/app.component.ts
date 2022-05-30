import {
  ChangeDetectionStrategy,
  Component,
  SimpleChanges,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, take, timer } from 'rxjs';
import {
  addNewColorToGamePattern,
  addNewColorToUserPattern,
  emptyUserPattern,
  increaseLevel,
  resetGame,
} from './gamePattern/actions/gamePattern.action';
import { selectGamePatterns } from './gamePattern/selectors/gamePattern.selector';
import * as _ from 'lodash';
import 'tw-elements';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

const colorsArray: string[] = ['red', 'blue', 'green', 'yellow'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'simon-game';
  playStatus: boolean = true;
  gamePatterns$ = this.store.pipe(select(selectGamePatterns));
  userPattern: string[] = [];
  gamePattern: string[] = [];
  strictMode: boolean = false;
  selectedColor: string = '';
  addDropdownButton: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.gamePatterns$.subscribe((message) => {
      this.userPattern = message.userPattern;
      this.gamePattern = message.gamePattern;
      this.strictMode = message.strictMode;
    });
  }

  addNewColorToUserPattern(color: string): void {
    this.store.dispatch(addNewColorToUserPattern({ color }));
    this.checkAnswer();
  }

  checkAnswer() {
    const lengthIsSame = this.checkIfPatternLengthsAreEqual();
    const correct = this.comparePatterns();
    if (lengthIsSame) {
      if (correct) {
        this.store.dispatch(increaseLevel());
        this.store.dispatch(emptyUserPattern());
        this.addNewColorToGamePattern();
        this.showPattern();
      } else {
        if (
          !JSON.stringify(this.gamePattern).includes(
            JSON.stringify(this.userPattern).slice(0, -1)
          )
        ) {
          this.handleWrongAnswer();
        }
      }
    } else {
      if (
        !JSON.stringify(this.gamePattern).includes(
          JSON.stringify(this.userPattern).slice(0, -1)
        )
      ) {
        this.handleWrongAnswer();
      }
    }
  }

  handleWrongAnswer() {
    this.store.dispatch(emptyUserPattern());
    if (this.strictMode) {
      this.resetGame();
    } else {
      this.showPattern();
    }
  }

  initializeGame(): void {
    this.playStatus = false;
    this.addNewColorToGamePattern();
    this.store.dispatch(increaseLevel());
    this.showPattern();
  }

  resetGame(): void {
    this.store.dispatch(resetGame());
  }

  addNewColorToGamePattern() {
    const colorNumber = Math.floor(Math.random() * 4);
    const color = colorsArray[colorNumber];
    this.store.dispatch(addNewColorToGamePattern({ color }));
  }

  comparePatterns(): boolean {
    return (
      JSON.stringify(this.gamePattern) === JSON.stringify(this.userPattern)
    );
  }

  addLevel() {
    this.store.dispatch(increaseLevel());
  }

  showPattern() {
    const intervalCount = interval(1000);
    const takeNumberOfEntries = intervalCount
      .pipe(take(this.gamePattern.length + 1))
      .pipe();
    this.playStatus = true;
    takeNumberOfEntries.subscribe((x) => {
      if (this.gamePattern[x]) {
        this.selectedColor = this.gamePattern[x];
        _.delay(() => {
          this.selectedColor = '';
        }, 300);
      } else {
        this.selectedColor = '';
        this.playStatus = false;
      }
    });
  }

  checkIfPatternLengthsAreEqual(): boolean {
    return this.gamePattern.length === this.userPattern.length;
  }
}
