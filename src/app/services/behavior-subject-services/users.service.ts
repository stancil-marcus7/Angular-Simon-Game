import { UserHTTPService } from './../user-http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable()
export class UsersService {
  private dataSource = new BehaviorSubject<User[]>([]);
  data = this.dataSource.asObservable();

  constructor() {}

  setUsers(users: User[]) {
    this.dataSource.next(users);
  }

  returnCurrentValue(): User[] {
    return this.dataSource.getValue();
  }
}
