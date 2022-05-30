import { Injectable } from '@angular/core';

const colorsArray: string[] = ['red', 'blue', 'green', 'yellow'];

@Injectable({
  providedIn: 'root',
})
export class GamePatternService {
  gamePattern: string[] = [];
  userPattern: string[] = [];

  constructor() {}

  addNewColorToGame(): void {
    const newColor = this.getNewRandomColor();
    console.log('newColor', newColor);
  }

  getNewRandomColor(): string {
    const colorNumber = Math.floor(Math.random() * 4);
    return colorsArray[colorNumber];
  }
}
