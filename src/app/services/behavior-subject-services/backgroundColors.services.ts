import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundColors } from 'src/app/interfaces/backgroundColors';

@Injectable()
export class BackgroundColorsService {
  private dataSource = new BehaviorSubject<BackgroundColors>({
    mainBackgroundColor: 'bg-indigo-800',
    navbarColor: 'bg-indigo-900',
  });
  data = this.dataSource.asObservable();

  constructor() {}

  setBackgroundColorState(correct: boolean) {
    if (correct) {
      this.dataSource.next({
        mainBackgroundColor: 'bg-indigo-800',
        navbarColor: 'bg-indigo-900',
      });
    } else {
      this.dataSource.next({
        mainBackgroundColor: 'bg-red-700',
        navbarColor: 'bg-red-800',
      });
    }
  }
}
