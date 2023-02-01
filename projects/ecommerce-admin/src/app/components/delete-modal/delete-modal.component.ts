import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() id: string = 'this';
  @Input() type: string = 'this';
  @Input() name?: string = 'item';

  @Output() itemDelete = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteHandler() {
    this.itemDelete.emit();
  }
}
