import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DomainsComponent } from './domains/domains.component';
import { TemplatesComponent } from './templates/templates.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'domains',
        component: DomainsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'templates',
        component: TemplatesComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
