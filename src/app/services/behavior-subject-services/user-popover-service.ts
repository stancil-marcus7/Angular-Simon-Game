import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserPopoverService {
  private dataSource = new BehaviorSubject<boolean>(false);
  data = this.dataSource.asObservable();

  constructor() {}

  openUserPopover(val: boolean) {
    this.dataSource.next(val);
  }
}
