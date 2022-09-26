import { UserHTTPService } from './../user-http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable()
export class UserService {
  private dataSource = new BehaviorSubject<User>({
    username: '',
    strictScore: 0,
    regularScore: 0,
  });
  data = this.dataSource.asObservable();

  constructor() {}

  setUser(user: User) {
    this.dataSource.next(user);
  }

  returnCurrentValue(): User {
    return this.dataSource.getValue();
  }
}
