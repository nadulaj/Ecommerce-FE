import { Injectable } from '@angular/core';

import { CommonService } from '..';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private cs: CommonService) {}

  getorders(): Promise<any> {


    return this.cs.getData(`orders/`);
  }

}
