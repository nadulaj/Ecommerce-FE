import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  template: `
    <div
      class="d-flex flex-column justify-content-evenly align-items-center no-data-root"
      [style]="'height: ' + componentHeight">
      <img src="assets/icons/no-data.svg" alt="no data" />

      <h6>Oh! There are nothing to show</h6>
    </div>
  `,
  styleUrls: ['no-data.component.scss'],
})
export class NoDataComponent implements OnInit {
  @Input() componentHeight: string = '100%';

  constructor() {}

  ngOnInit(): void {}
}
