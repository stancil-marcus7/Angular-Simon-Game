import { BackgroundColorsService } from './services/behavior-subject-services/backgroundColors.services';
import { BackgroundColors } from './interfaces/backgroundColors';
import { UserHTTPService } from './services/user-http.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, take } from 'rxjs';
import * as _ from 'lodash';
import 'tw-elements';
import { GamePatternService } from './services/behavior-subject-services/gamePattern.service';
import { UserService } from './services/behavior-subject-services/user.service';
import { UsersService } from './services/behavior-subject-services/users.service';

const colorsArray: string[] = ['red', 'blue', 'green', 'yellow'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'simon-game';
  playStatus: boolean = true;
  userPattern: string[] = [];
  gamePattern: string[] = [];
  strictMode: boolean = false;
  selectedColor: string = '';
  addDropdownButton: boolean = false;
  userRegularScore: number = 0;
  userStrictScore: number = 0;
  username: string = '';
  backgroundColorsCorrect: boolean = true;
  backgroundColor: string = 'bg-indigo-800';

  constructor(
    private gamePatternService: GamePatternService,
    private userService: UserService,
    private userHttpService: UserHTTPService,
    private backgroundColorsService: BackgroundColorsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    const bearerToken = localStorage.getItem('access_token');
    if (bearerToken) {
      console.log('bearerToken', bearerToken);
      this.userHttpService
        .getUser()
        .subscribe((user) => this.userService.setUser(user));
    }
    this.gamePatternService.data.subscribe((message) => {
      this.userPattern = message.userPattern;
      this.gamePattern = message.gamePattern;
      this.strictMode = message.strictMode;
    });

    this.userService.data.subscribe((message) => {
      if (message.username) {
        this.username = message.username;
        this.userRegularScore = message.regularScore;
        this.userStrictScore = message.strictScore;
      }
    });

    this.backgroundColorsService.data.subscribe((message) => {
      this.backgroundColorsCorrect = message;
    });

    this.userHttpService.getUsers().subscribe((message) => {
      this.usersService.setUsers(message);
    });
  }

  addNewColorToUserPattern(color: string): void {
    this.gamePatternService.updateUserPattern(color);
    this.checkAnswer();
  }

  checkAnswer() {
    const lengthIsSame = this.checkIfPatternLengthsAreEqual();
    const correct = this.comparePatterns();
    if (lengthIsSame) {
      if (correct) {
        this.addLevel();
        this.gamePatternService.emptyUserPattern();
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
    this.gamePatternService.emptyUserPattern();
    if (this.strictMode) {
      console.log('this.strictMode', this.strictMode);
      this.resetGame();
    } else {
      this.showPattern();
    }

    this.backgroundColorsService.setBackgroundColorState(false);
    setTimeout(
      () => this.backgroundColorsService.setBackgroundColorState(true),
      1000
    );
  }

  get getBackgroundColor(): string {
    if (this.backgroundColorsCorrect) {
      this.backgroundColor = 'bg-indigo-800';
    } else {
      this.backgroundColor = 'bg-red-800';
    }

    return this.backgroundColor;
  }

  initializeGame(): void {
    this.playStatus = false;
    this.addNewColorToGamePattern();
    this.gamePatternService.updateLevel();
    this.showPattern();
    console.log('gamePattern', this.gamePattern);
  }

  resetGame(): void {
    this.gamePatternService.resetGame();
  }

  addNewColorToGamePattern() {
    const colorNumber = Math.floor(Math.random() * 4);
    const color = colorsArray[colorNumber];
    this.gamePatternService.updateGamePattern(color);
  }

  comparePatterns(): boolean {
    return (
      JSON.stringify(this.gamePattern) === JSON.stringify(this.userPattern)
    );
  }

  addLevel() {
    this.gamePatternService.updateLevel();
    let currentScore: number = this.strictMode
      ? this.userStrictScore
      : this.userRegularScore;
    if (this.username) {
      if (
        this.gamePatternService.returnCurrentValue().level > currentScore &&
        !this.strictMode
      ) {
        this.userHttpService.updateRegularScore(
          this.gamePatternService.returnCurrentValue().level
        );
      } else if (
        this.gamePatternService.returnCurrentValue().level > currentScore &&
        this.strictMode
      ) {
        this.userHttpService.updateStrictScore(
          this.gamePatternService.returnCurrentValue().level
        );
      }
    }
    this.userHttpService.getUsers().subscribe((message) => {
      this.usersService.setUsers(message);
    });
  }

  showPattern() {
    const el: HTMLElement | null = document.getElementById('appDiv');
    el?.click();
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
