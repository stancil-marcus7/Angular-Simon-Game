import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent implements OnInit {
  play: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public setPlay(value: boolean) {
    this.play = value;
  }
}
