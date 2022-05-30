import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faBarsIcon: IconDefinition = faBars;
  addSideBarButton: boolean = false;
  isOpen: boolean = false;
  @Output() isOpenEmitter = new EventEmitter<boolean>();
  constructor(public breakpointObserver: BreakpointObserver) {}

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
  }

  onClickSideBar(): void {
    _.delay(() => (this.isOpen = !this.isOpen), 250);
  }

  sendIsOpenStatus() {
    this.isOpenEmitter.emit(this.isOpen);
  }
}
