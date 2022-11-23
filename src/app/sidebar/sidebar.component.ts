import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import {
  faUser,
  IconDefinition,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user.interface';
import { GameScoresModalService } from '../services/behavior-subject-services/game-scores.service';
import { SignInModalService } from '../services/behavior-subject-services/sign-in-modal.service';
import { UserPopoverService } from '../services/behavior-subject-services/user-popover-service';
import { UserService } from '../services/behavior-subject-services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faUserIcon: IconDefinition = faUser;
  faTableIcon: IconDefinition = faTable;
  _isOpen: string = '';
  subscription: any;
  clicked: string = '';
  userSubscription: any = null;
  showStats: boolean = false;

  user: User = {
    username: '',
    strictScore: 0,
    regularScore: 0,
  };

  constructor(
    private signInService: SignInModalService,
    public breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private userPopoverService: UserPopoverService,
    private gameScoresModalService: GameScoresModalService
  ) {}

  ngOnInit(): void {
    console.log('open', this._isOpen);
    this.subscription = this.signInService.data.subscribe((message: string) => {
      this.clicked = message;
    });
    this.userSubscription = this.userService.data.subscribe((message) => {
      this.user = message;
    });
  }

  openGameScoresModalState() {
    this.gameScoresModalService.setGameScoresModalState('slideIn');
  }

  onOpenSignInModal(): void {
    this.signInService.openSignInModal('slideIn');
  }

  @Input()
  public set isOpen(value: string) {
    this._isOpen = value;
  }

  public get isOpen(): string {
    return this._isOpen;
  }

  openPopover() {
    this.userPopoverService.openUserPopover(true);
  }
}
