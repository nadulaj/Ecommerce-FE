import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ThemeModule } from '../@theme/theme.module';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DomainsComponent } from './domains/domains.component';
import { TemplatesComponent } from './templates/templates.component';
import { ComponentModule } from '../components/component.module';
import { TemplateFormComponent } from './templates/template-form/template-form.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  imports: [
    RouterModule,
    PagesRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComponentModule,
    ThemeModule,
  ],
  providers: [],
  declarations: [
    PagesComponent,
    NotFoundComponent,
    DashboardComponent,
    DomainsComponent,
    TemplatesComponent,
    TemplateFormComponent,
    OrdersComponent,
  ],
  exports: [],
})
export class PagesModule {}
