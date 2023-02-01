import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../../@core/services';
import { DomainType } from '../../@core/models/types';
import { CRUD_TYPES } from '../../keys';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
})
export class DomainsComponent implements OnInit {
  crudTypes = CRUD_TYPES;
  crudType = CRUD_TYPES.add;
  domains: any[] = [];
  domainCount: number = 0;
  isLoading: boolean = false;
  isRequesting: boolean = false;
  page: number = 1;
  limit: number = 10;
  // filterForm: FormGroup;
  domainForm: FormGroup;
  activeModalId: string = '';
  deletingDomain?: DomainType;
  updatingDomain?: DomainType;

  constructor(private catServ: CategoryService, private fb: FormBuilder, private toastr: ToastrService) {
    // this.filterForm = this.fb.group({
    //   name: '',
    //   domain: '',
    //   is_active: '',
    // });

    this.domainForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      domain: ['', Validators.required],
      description: '',
      is_active: false,
      is_published: 1,
    });
  }

  // domain form fields
  get id() {
    return this.domainForm.get('id');
  }
  get name() {
    return this.domainForm.get('name');
  }
  get domain() {
    return this.domainForm.get('domain');
  }
  get description() {
    return this.domainForm.get('description');
  }
  get is_active() {
    return this.domainForm.get('is_active');
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(loading: boolean = true) {
    if (loading) {
      this.isLoading = true;
    }

    this.catServ
      .getcategories()
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

  async addUpdateDomain(domain?: DomainType) {
    // if (this.isRequesting) return;

    // // trigger validations
    // Object.keys(this.domainForm.controls).forEach((field) => {
    //   const control = this.domainForm.get(field);
    //   control?.markAllAsTouched();
    // });

    // if (!this.domainForm.valid) return;

    // // console.log(this.domainForm.value);

    // this.isRequesting = true;
    // let res = null;

    // if (this.crudType === this.crudTypes.add) {
    //   // add
    //   let body: DomainType = {
    //     name: this.name?.value,
    //     domain: this.domain?.value,
    //     description: this.description?.value,
    //     is_active: this.is_active?.value === true ? 1 : 0,
    //     is_published: 1,
    //   };
    //   res = await this.ds.addDomain(body);
    // } else {
    //   // update
    //   let body: DomainType = {
    //     is_published: 1,
    //   };

    //   if (this.updatingDomain?.name !== this.name?.value) {
    //     body['name'] = this.name?.value;
    //   }
    //   if (this.updatingDomain?.domain !== this.domain?.value) {
    //     body['domain'] = this.domain?.value;
    //   }
    //   if (this.updatingDomain?.description !== this.description?.value) {
    //     body['description'] = this.description?.value;
    //   }
    //   if (this.updatingDomain?.is_active !== this.is_active?.value) {
    //     body['is_active'] = this.is_active?.value;
    //   }
    //   res = await this.ds.updateDomain(body, this.id?.value);
    // }

    // try {
    //   console.log('addUpdateDomain', res);

    //   if (res) {
    //     if (res?.status === 100) {
    //       const w = this.crudType === this.crudTypes.add ? 'added' : 'updated';
    //       // this.filterForm.reset();
    //       $(this.activeModalId).modal('hide');
    //       this.toastr.success('Success!', `Domain ${w} successfully.`);
    //       this.domainForm.reset();
    //       this.page = 1;
    //       this.getDomains(false);
    //     } else {
    //       const w = this.crudType === this.crudTypes.add ? 'Adding' : 'Updating';
    //       this.toastr.error('Oh Snap!', res?.message || `${w} domain failed`);
    //     }
    //   }
    // } catch (err) {
    //   console.error(err);
    //   this.toastr.error('Oh Snap!', 'Server Error');
    // } finally {
    //   this.isRequesting = false;
    // }
  }

  deleteDomain() {
    // // console.log(this.deletingDomain);
    // if (this.isRequesting) return;

    // this.ds
    //   .deleteDomain(this.deletingDomain?.id!)
    //   .then((res) => {
    //     console.log('deleteDomain', res);

    //     if (res) {
    //       if (res?.status === 100) {
    //         $(this.activeModalId).modal('hide');
    //         this.toastr.success('Success!', 'Domain deleted Successfully');
    //         this.getDomains(false);
    //       } else {
    //         this.toastr.error('Oh Snap!', res?.message || 'Deleting domain failed');
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

  openModal(id: string, type: string = this.crudTypes.add, domain?: DomainType) {
    // this.crudType = type;

    // if (type === this.crudTypes.add) {
    //   this.domainForm.reset();
    // } else if (type === this.crudTypes.update) {
    //   this.updatingDomain = domain;

    //   this.domainForm.setValue({
    //     id: domain?.id,
    //     name: domain?.name,
    //     domain: domain?.domain,
    //     description: domain?.description,
    //     is_active: domain?.is_active === 1 && true,
    //     is_published: 1,
    //   });
    // } else if (type === this.crudTypes.delete) {
    //   this.deletingDomain = domain;
    // } else {
    //   return;
    // }

    // $(id)?.modal('show');
    // this.activeModalId = id;
  }

  pageChanged(newPage: number) {
    // const { name, domain, is_active } = this.filterForm.value;
    // if (!name && !domain && !is_active) return;

    this.page = newPage;
    // this.getDomains(false);
  }

  refreshDomains() {
    this.limit = 10;
    this.page = 1;
    // this.getDomains();
  }

  limitChange($event: any) {
    this.limit = parseInt($event.target.value);
    this.page = 1;
    // this.getDomains(false);
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.domainForm.get(fieldName);

    if (field && field.touched && field.errors) {
      return false;
    }
    return true;
  }

  getFieldClass(fieldName: string): string {
    const field = this.domainForm.get(fieldName);

    if (field && (field.touched || field.dirty)) {
      if (field.invalid || field.errors) {
        return 'is-invalid';
      } else {
        return 'is-valid';
      }
    }
    return '';
  }

  // clearFilterForm() {
  //   const { name, domain, is_active } = this.filterForm.value;

  //   if (!name && !domain && !is_active) return;

  //   this.filterForm.reset();
  //   this.page = 1;
  //   this.getDomains(false);
  // }
}
