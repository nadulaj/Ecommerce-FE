import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { OrderService } from '../../@core/services';
import { DomainType } from '../../@core/models/types';
import { CRUD_TYPES } from '../../keys';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  crudTypes = CRUD_TYPES;
  crudType = CRUD_TYPES.add;
  domains: any[] = [];
  domainCount: number = 0;
  isLoading: boolean = false;
  isRequesting: boolean = false;
  activeModalId: string = '';
  deletingDomain?: DomainType;
  updatingDomain?: DomainType;
  constructor(private catServ: OrderService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrders()
  }


  getOrders(loading: boolean = true) {
    if (loading) {
      this.isLoading = true;
    }

    this.catServ
      .getorders()
      .then((res) => {
        console.log('getDomains', res);

        if (res) {
          if (res) {
            this.domains = res;
          } else {
            this.toastr.error('Oh Snap!', 'Getting domain details failed');
          }
        }
      })
      .catch((err) => {
        console.error(err);
        this.toastr.error('Oh Snap!', 'Server Error');
      })
      .finally(() => (this.isLoading = false));
  }

}
