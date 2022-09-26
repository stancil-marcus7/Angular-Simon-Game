import { Component, OnInit } from '@angular/core';
import {
  faArrowRightFromBracket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/behavior-subject-services/user.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css'],
})
export class LogOutComponent implements OnInit {
  faLogoutIcon: IconDefinition = faArrowRightFromBracket;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onLogout(): void {
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
    localStorage.setItem('access_token_expiration', '');
    localStorage.setItem('refresh_token_expiration', '');
    this.userService.setUser({ username: '', strictScore: 0, regularScore: 0 });
  }
}
