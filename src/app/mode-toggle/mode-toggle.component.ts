import { Component, OnInit } from '@angular/core';
import { GamePatternService } from '../services/behavior-subject-services/gamePattern.service';

@Component({
  selector: 'app-mode-toggle',
  templateUrl: './mode-toggle.component.html',
  styleUrls: ['./mode-toggle.component.css'],
})
export class ModeToggleComponent implements OnInit {
  strictMode: boolean = false;

  constructor(private gamePatternService: GamePatternService) {}

  ngOnInit(): void {
    this.gamePatternService.data.subscribe((message) => {
      this.strictMode = message.strictMode;
    });
  }

  togglePlayMode() {
    this.strictMode = !this.strictMode;
    this.gamePatternService.toggleStrictMode(this.strictMode);
  }
}
