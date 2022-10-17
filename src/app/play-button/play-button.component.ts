import { GamePatternService } from './../services/behavior-subject-services/gamePattern.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectGamePatterns } from '../gamePattern/selectors/gamePattern.selector';
import { BackgroundColorsService } from '../services/behavior-subject-services/backgroundColors.services';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent implements OnInit {
  play: boolean = false;
  @Output() playStatusEmitter = new EventEmitter<boolean>();
  level: number = 0;
  message: string = 'Do your best';
  backgroundColorsCorrect: boolean = true;

  constructor(
    private gamePatternService: GamePatternService,
    private backgroundColorsService: BackgroundColorsService
  ) {}

  ngOnInit(): void {
    this.gamePatternService.data.subscribe((message) => {
      this.level = message.level;
    });
    this.backgroundColorsService.data.subscribe((message) => {
      this.backgroundColorsCorrect = message;
    });
  }

  scroll() {
    const el: HTMLElement | null = document.getElementById('buttons');
    el?.scrollIntoView();
  }

  get getMessage(): string {
    if (this.backgroundColorsCorrect) {
      this.message = 'Do your best';
    } else {
      this.message = 'Incorrect, try again!';
    }

    return this.message;
  }
}
