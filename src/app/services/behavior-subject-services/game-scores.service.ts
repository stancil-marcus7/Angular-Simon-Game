import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GameScoresModalService {
  private dataSource = new BehaviorSubject<string>('');
  data = this.dataSource.asObservable();

  constructor() {}

  setGameScoresModalState(val: string) {
    this.dataSource.next(val);
  }
}
