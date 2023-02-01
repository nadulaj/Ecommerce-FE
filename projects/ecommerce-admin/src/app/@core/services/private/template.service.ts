import { Injectable } from '@angular/core';

import { CommonService } from '..';
import { TemplateType } from '../../models/types';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private cs: CommonService) {}

  getTemplates(page: number, limit: number): Promise<any> {
    let params = `?page=${page}&limit=${limit}`;
    return this.cs.getData(`admin/template/${params}`);
  }

  addTemplate(body: TemplateType): Promise<any> {
    return this.cs.postData('admin/template/', body);
  }

  updateTemplate(body: TemplateType, id: number): Promise<any> {
    return this.cs.putData(`admin/template/${id}/`, body);
  }

  deleteTemplate(id: number): Promise<any> {
    return this.cs.deleteData(`admin/template/${id}/`);
  }
}
