import { UserService } from './../services/behavior-subject-services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.css'],
})
export class UserPopoverComponent implements OnInit {
  user: User = {
    username: '',
    strictScore: 0,
    regularScore: 0,
  };
  showStats: boolean = false;

  userSubscription: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.data.subscribe((message) => {
      this.user = message;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  toggleStats(val: boolean) {
    console.log(val);
    this.showStats = val;
  }
}
