import { Injectable } from '@angular/core';

import { CommonService } from '..';


@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private cs: CommonService) {}

  getItems(): Promise<any> {


    return this.cs.getData(`items/`);
  }

  addItems(body: any): Promise<any> {
    return this.cs.postData('items/', body);
  }

  updateDomain(body: any, id: number): Promise<any> {
    return this.cs.putData(`admin/domain/${id}/`, body);
  }

  deleteDomain(id: number): Promise<any> {
    return this.cs.deleteData(`admin/domain/${id}/`);
  }
}
