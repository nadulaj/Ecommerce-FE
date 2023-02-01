import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-refresh-btn',
  templateUrl: './refresh-btn.component.html',
  styleUrls: ['./refresh-btn.component.scss'],
})
export class RefreshBtnComponent implements OnInit {
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickHandler() {
    this.btnClick.emit();
  }
}
