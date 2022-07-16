import { GamePatternService } from './../services/behavior-subject-services/gamePattern.service';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  constructor(private gamePatternService: GamePatternService) {}

  @Input() color: string = '';
  _disabled: boolean = true;
  @Output() colorClicked = new EventEmitter<string>();
  _selected: string = '';
  gamePattern: string[] = [];

  ngOnInit(): void {
    this.gamePatternService.data.subscribe((message) => {
      this.gamePattern = message.gamePattern;
    });
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  public get selected(): string {
    return this._selected;
  }

  @Input()
  public set selected(color: string) {
    this._selected = color;
  }

  getSelectedColorStatus() {
    return this._selected === this.color;
  }
}
