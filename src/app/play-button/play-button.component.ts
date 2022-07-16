import { GamePatternService } from './../services/behavior-subject-services/gamePattern.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectGamePatterns } from '../gamePattern/selectors/gamePattern.selector';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent implements OnInit {
  play: boolean = false;
  @Output() playStatusEmitter = new EventEmitter<boolean>();
  level: number = 0;

  constructor(private gamePatternService: GamePatternService) {}

  ngOnInit(): void {
    this.gamePatternService.data.subscribe((message) => {
      this.level = message.level;
    });
  }
}
