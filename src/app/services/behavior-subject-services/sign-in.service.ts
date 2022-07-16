import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class OpenSignInModalService {
  private dataSource = new BehaviorSubject<string>('');
  data = this.dataSource.asObservable();

  constructor() {}

  openSignInModal(val: string) {
    this.dataSource.next(val);
  }
}
