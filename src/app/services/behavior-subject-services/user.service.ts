import { UserHTTPService } from './../user-http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  private dataSource = new BehaviorSubject<User>({
    username: '',
    strictScore: 0,
    regularScore: 0,
  });
  data = this.dataSource.asObservable();

  constructor(private userHTTPService: UserHTTPService) {}

  setUser(user: User) {
    this.dataSource.next(user);
  }

  updateRegularScore(regularScore: number) {
    const user = this.returnCurrentValue();
    console.log('regularScore', regularScore);
    try {
      this.userHTTPService
        .updateUserScores({
          ...user,
          regularScore,
        })
        .subscribe((user) => {
          console.log('update user', user);
          this.dataSource.next(user);
        });
    } catch (error) {
      console.log(error);
    }
  }

  updateStrictScore(strictScore: number) {
    const user = this.returnCurrentValue();
    try {
      this.userHTTPService
        .updateUserScores({
          ...user,
          strictScore,
        })
        .subscribe((user) => this.dataSource.next(user));
    } catch (error) {
      console.log(error);
    }
  }

  returnCurrentValue(): User {
    return this.dataSource.getValue();
  }
}
