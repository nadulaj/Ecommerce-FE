import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CoreModule } from '../@core/core.module';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { IconBtnComponent } from './icon-btn/icon-btn.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NoDataComponent } from './no-data/no-data.component';
import { RefreshBtnComponent } from './refresh-btn/refresh-btn.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CopyTextComponent } from './copy-text/copy-text.component';

@NgModule({
  imports: [CommonModule, AngularSvgIconModule, CoreModule],
  declarations: [
    BreadcrumbComponent,
    IconBtnComponent,
    LoadingSpinnerComponent,
    NoDataComponent,
    RefreshBtnComponent,
    DeleteModalComponent,
    FileUploadComponent,
    CopyTextComponent,
  ],
  providers: [],

  exports: [
    BreadcrumbComponent,
    IconBtnComponent,
    LoadingSpinnerComponent,
    NoDataComponent,
    RefreshBtnComponent,
    DeleteModalComponent,
    FileUploadComponent,
    CopyTextComponent,
  ],
})
export class ComponentModule {}
