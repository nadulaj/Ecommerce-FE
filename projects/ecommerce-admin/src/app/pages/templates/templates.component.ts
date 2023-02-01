import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ItemsService } from '../../@core/services';
import { TemplateType } from '../../@core/models/types';
import { CRUD_TYPES } from '../../keys';
import { TemplateFormComponent } from './template-form/template-form.component';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery'
@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  @ViewChild(TemplateFormComponent, { static: true })
  templateFormComponentRef?: TemplateFormComponent;

  imageBaseUrl = environment.aws;
  crudTypes = CRUD_TYPES;
  crudType = CRUD_TYPES.add;
  templates: any[] = [];
  templateCount: number = 0;
  isLoading: boolean = false;
  isRequesting: boolean = false;
  page: number = 1;
  limit: number = 10;

  activeModalId: string = '';
  viewingTemplate?: TemplateType;
  deletingTemplate?: TemplateType;

  constructor(
    private ts: ItemsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates(loading: boolean = true) {
    if (loading) {
      this.isLoading = true;
    }

    this.ts
      .getItems()
      .then((res) => {
        console.log('getTemplates', res);

        if (res) {
          if (res) {
            this.templates = res;
       
          } else {
            this.toastr.error('Oh Snap!', 'Getting template details failed');
          }
        }
      })
      .catch((err) => {
        console.error(err);
        this.toastr.error('Oh Snap!', 'Server Error');
      })
      .finally(() => (this.isLoading = false));
  }

  async addUpdateTemplate(template: TemplateType) {
    // console.log(template);
    // this.isRequesting = true;

    // let res = null;

    // if (this.crudType === this.crudTypes.add) {
    //   // add
    //   res = await this.ts.addTemplate(template);
    // } else {
    //   // update
    //   res = await this.ts.updateTemplate(template, template.id!);
    // }

    // try {
    //   console.log('addUpdateTemplate', res);

    //   if (res) {
    //     if (res?.status === 100) {
    //       const w = this.crudType === this.crudTypes.add ? 'added' : 'updated';
    //       $(this.activeModalId).modal('hide');
    //       this.toastr.success('Success!', `Template ${w} successfully.`);
    //       this.templateFormComponentRef?.resetModal();
    //       this.page = 1;
    //       this.getTemplates(false);
    //     } else {
    //       const w = this.crudType === this.crudTypes.add ? 'Adding' : 'Updating';
    //       this.toastr.error('Oh Snap!', res?.message || `${w} template failed`);
    //     }
    //   }
    // } catch (err) {
    //   console.error(err);
    //   this.toastr.error('Oh Snap!', 'Server Error');
    // } finally {
    //   this.isRequesting = false;
    // }
  }

  deleteTemplate() {
    // // console.log(this.deleteTemplate);
    // this.isRequesting = true;

    // this.ts
    //   .deleteTemplate(this.deletingTemplate?.id!)
    //   .then((res) => {
    //     console.log('deleteTemplate', res);

    //     if (res) {
    //       if (res?.status === 100) {
    //         $(this.activeModalId).modal('hide');
    //         this.toastr.success('Success!', 'Template deleted Successfully');
    //         this.getTemplates(false);
    //       } else {
    //         this.toastr.error('Oh Snap!', res?.message || 'Deleting template failed');
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     this.toastr.error('Oh Snap!', 'Server Error');
    //   })
    //   .finally(() => {
    //     this.isRequesting = false;
    //   });
  }

  openModal(id: string, type: string = this.crudTypes.add, template?: any) {
    // this.crudType = type;

    // if (type === this.crudTypes.view) {
    //   this.viewingTemplate = template;
    // }

    // if (type === this.crudTypes.update) {
    //   this.templateFormComponentRef?.setTemplate(template);
    // }

    // if (type === this.crudTypes.delete) {
    //   this.deletingTemplate = template;
    // }

    // this.activeModalId = id;
    // setTimeout(() => {
    //   $(id)?.modal('show');
    // }, 100);
  }

  pageChanged(newPage: number) {
    this.page = newPage;
    this.getTemplates(false);
  }

  refreshTemplates() {
    this.limit = 10;
    this.page = 1;
    this.getTemplates();
  }

  limitChange($event: any) {
    this.limit = parseInt($event.target.value);
    this.page = 1;
    this.getTemplates(false);
  }
}
