import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss'],
})
export class CopyTextComponent implements OnInit {
  @Input() text: string | undefined = '';

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  async copyToClipboard() {
    if (!this.text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(this.text);
      this.toastr.success('Copied!');
    } catch (error) {
      console.error('Error', error);
    }
  }
}
