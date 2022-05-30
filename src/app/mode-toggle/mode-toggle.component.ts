import { toggleStrictMode } from './../gamePattern/actions/gamePattern.action';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectGamePatterns } from '../gamePattern/selectors/gamePattern.selector';

@Component({
  selector: 'app-mode-toggle',
  templateUrl: './mode-toggle.component.html',
  styleUrls: ['./mode-toggle.component.css'],
})
export class ModeToggleComponent implements OnInit {
  strictMode: boolean = false;
  gamePattern$ = this.store.pipe(select(selectGamePatterns));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.gamePattern$.subscribe((message) => {
      this.strictMode = message.strictMode;
    });
  }

  togglePlayMode() {
    this.store.dispatch(toggleStrictMode());
  }
}
