import { UserService } from './../services/behavior-subject-services/user.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UserPopoverService } from '../services/behavior-subject-services/user-popover-service';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.css'],
})
export class UserPopoverComponent implements OnInit, OnDestroy {
  user: User = {
    username: '',
    strictScore: 0,
    regularScore: 0,
  };
  _showStats: boolean = false;
  faIcon = faXmarkCircle;
  userSubscription: any = null;
  popoverStylesMobile: boolean = false;
  popoverOpenSubscription: any = null;

  constructor(
    private userService: UserService,
    public breakpointObserver: BreakpointObserver,
    private userPopoverService: UserPopoverService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 640px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.popoverStylesMobile = true;
        } else {
          this.popoverStylesMobile = false;
        }
      });
    this.userSubscription = this.userService.data.subscribe((message) => {
      this.user = message;
    });
    this.popoverOpenSubscription = this.userPopoverService.data.subscribe(
      (message) => {
        this._showStats = message;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public closePopover() {
    this.userPopoverService.openUserPopover(false);
  }

  public get showStats() {
    return this._showStats;
  }
}
