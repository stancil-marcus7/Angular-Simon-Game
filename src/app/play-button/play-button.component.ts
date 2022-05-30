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
  gamePatterns$ = this.store.pipe(select(selectGamePatterns));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.gamePatterns$.subscribe((message) => {
      this.level = message.level;
    });
  }
}
