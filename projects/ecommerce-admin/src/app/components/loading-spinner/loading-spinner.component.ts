import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div
      class="d-flex justify-content-center align-items-center"
      [style]="'height: ' + componentHeight">
      <div class="spinner-grow text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() componentHeight: string = '100%';

  constructor() {}

  ngOnInit(): void {}
}
