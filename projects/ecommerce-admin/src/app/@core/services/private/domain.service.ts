import { Injectable } from '@angular/core';

import { CommonService } from '..';
import { DomainType } from '../../models/types';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  constructor(private cs: CommonService) {}

  getDomains(page: number, limit: number): Promise<any> {
    let params = `?page=${page}&limit=${limit}`;

    // if (filterKeys.name) {
    //   params += '&name=' + filterKeys.name;
    // }
    // if (filterKeys.domain) {
    //   params += '&domain=' + filterKeys.domain;
    // }
    // if (filterKeys.is_active) {
    //   params += '&is_active=' + filterKeys.is_active;
    // }

    return this.cs.getData(`admin/domain/${params}`);
  }

  addDomain(body: DomainType): Promise<any> {
    return this.cs.postData('admin/domain/', body);
  }

  updateDomain(body: DomainType, id: number): Promise<any> {
    return this.cs.putData(`admin/domain/${id}/`, body);
  }

  deleteDomain(id: number): Promise<any> {
    return this.cs.deleteData(`admin/domain/${id}/`);
  }
}
