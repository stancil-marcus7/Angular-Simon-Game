import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackgroundColors } from 'src/app/interfaces/backgroundColors';

@Injectable()
export class BackgroundColorsService {
  private dataSource = new BehaviorSubject<boolean>(true);
  data = this.dataSource.asObservable();

  constructor() {}

  setBackgroundColorState(val: boolean) {
    this.dataSource.next(val);
  }
}
