import { UserPopoverService } from './../services/behavior-subject-services/user-popover-service';
import { UserService } from './../services/behavior-subject-services/user.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  faBars,
  faUser,
  faTable,
  IconDefinition,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { User } from 'src/app/interfaces/user.interface';
import { SignInModalService } from '../services/behavior-subject-services/sign-in-modal.service';
import { GameScoresModalService } from '../services/behavior-subject-services/game-scores.service';
import { UserHTTPService } from '../services/user-http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faBarsIcon: IconDefinition = faBars;
  faUserIcon: IconDefinition = faUser;
  faTableIcon: IconDefinition = faTable;
  faLogoutIcon: IconDefinition = faArrowRightFromBracket;
  addSideBarButton: boolean = false;
  isOpen: string = '';
  user: User = {
    username: '',
    strictScore: 0,
    regularScore: 0,
  };
  userSubscription: any = null;

  @Output() isOpenEmitter = new EventEmitter<string>();
  constructor(
    public breakpointObserver: BreakpointObserver,
    private signInService: SignInModalService,
    private userService: UserService,
    private gameScoresModalService: GameScoresModalService,
    private userPopoverService: UserPopoverService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 640px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.addSideBarButton = true;
        } else {
          this.addSideBarButton = false;
        }
      });

    this.userSubscription = this.userService.data.subscribe((message) => {
      this.user = message;
    });
  }

  onClickSideBar(): void {
    if (this.isOpen === 'sideBarSlideOut' || this.isOpen === '') {
      _.delay(() => {
        this.isOpen = 'sideBarSlideIn';
      }, 250);
    } else {
      _.delay(() => {
        this.isOpen = 'sideBarSlideOut';
      }, 250);
    }
  }

  openSignInModal(): void {
    this.signInService.openSignInModal('slideIn');
  }

  openGameScoresModalState(): void {
    this.gameScoresModalService.setGameScoresModalState('slideIn');
  }

  openUserPopover(): void {
    this.userPopoverService.openUserPopover(true);
  }

  onLogout(): void {
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
    localStorage.setItem('access_token_expiration', '');
    localStorage.setItem('refresh_token_expiration', '');
    this.userService.setUser({ username: '', strictScore: 0, regularScore: 0 });
  }
}
