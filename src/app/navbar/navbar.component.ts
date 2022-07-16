import { UserService } from './../services/behavior-subject-services/user.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faBars,
  faUser,
  faTable,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { User } from 'src/interfaces/user.interface';
import { OpenSignInModalService } from '../services/behavior-subject-services//sign-in.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faBarsIcon: IconDefinition = faBars;
  faUserIcon: IconDefinition = faUser;
  faTableIcon: IconDefinition = faTable;
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
    private signInService: OpenSignInModalService,
    private userService: UserService
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
}
