import { UsersService } from './../services/behavior-subject-services/users.service';
import { UserHTTPService } from './../services/user-http.service';
import { GameScoresModalService } from './../services/behavior-subject-services/game-scores.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from '../interfaces/user.interface';
import { UserPopoverService } from '../services/behavior-subject-services/user-popover-service';

@Component({
  selector: 'app-scores-modal',
  templateUrl: './scores-modal.component.html',
  styleUrls: ['./scores-modal.component.css'],
})
export class ScoresModalComponent implements OnInit {
  clicked: string = '';
  subscription: any;
  faIcon = faXmarkCircle;
  users: User[] = [];
  tableCellStyles = 'border border-black p-4';

  constructor(
    private gameScoresModalService: GameScoresModalService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.subscription = this.gameScoresModalService.data.subscribe(
      (message) => {
        this.clicked = message;
      }
    );

    this.usersService.data.subscribe((message) => {
      this.setUsers(message);
    });
  }

  onCloseModal(): void {
    this.gameScoresModalService.setGameScoresModalState('slideOut');
    _.delay(() => {
      this.gameScoresModalService.setGameScoresModalState('');
    }, 500);
  }

  setUsers(users: User[]): void {
    this.users = users;
  }
}
