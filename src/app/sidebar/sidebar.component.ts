import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() _isOpen: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  @Input()
  public set isOpen(value: boolean) {
    this._isOpen = value;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }
}
