import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-btn',
  templateUrl: './icon-btn.component.html',
  styleUrls: ['./icon-btn.component.scss'],
})
export class IconBtnComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() text: string = '';
  @Input() btnClasses: string = 'btn';
  @Input() disabled: boolean = false;
  @Input() isIcon: boolean = true;
  @Input() iconName: string = '';
  @Input() iconClass: string = '';
  @Input() isLoading: boolean = false;

  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickHandler(event: any) {
    event.stopPropagation();
    this.btnClick.emit();
  }
}
