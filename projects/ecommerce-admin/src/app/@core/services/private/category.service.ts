import { Injectable } from '@angular/core';

import { CommonService } from '..';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private cs: CommonService) {}

  getcategories(): Promise<any> {


    return this.cs.getData(`categories/`);
  }

  addCatgories(body: any): Promise<any> {
    return this.cs.postData2('categories/add/', body);
  }

  updateDomain(body: any, id: number): Promise<any> {
    return this.cs.putData(`admin/domain/${id}/`, body);
  }

  deleteDomain(id: number): Promise<any> {
    return this.cs.deleteData(`categories/${id}/`);
  }
}
