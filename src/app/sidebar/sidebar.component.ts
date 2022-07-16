import { Component, Input, OnInit } from '@angular/core';
import {
  faUser,
  IconDefinition,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { OpenSignInModalService } from '../services/behavior-subject-services/sign-in.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faUserIcon: IconDefinition = faUser;
  faTableIcon: IconDefinition = faTable;
  @Input() _isOpen: string = '';
  subscription: any;
  clicked: string = '';

  constructor(private signInService: OpenSignInModalService) {}

  ngOnInit(): void {
    this.subscription = this.signInService.data.subscribe((message: string) => {
      this.clicked = message;
    });
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
}
