import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../../@core/services';
import { DomainType } from '../../@core/models/types';
import { CRUD_TYPES } from '../../keys';
import * as bootstrap from 'bootstrap';
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

  async addUpdateDomain() {
    if (this.isRequesting) return;
console.log("hghgkhk")
    // trigger validations
    Object.keys(this.domainForm.controls).forEach((field) => {
      const control = this.domainForm.get(field);
      control?.markAllAsTouched();
    });

 

    // console.log(this.domainForm.value);

    this.isRequesting = true;
    let res = null;
console.log(this.crudType)
    if (this.crudType === 'Add') {
      // add
      let body: any = {
        name: this.name?.value
      };
      res = await this.catServ.addCatgories(body);
    } else {
      // update
      let body: DomainType = {
        is_published: 1,
      };

      if (this.updatingDomain?.name !== this.name?.value) {
        body['name'] = this.name?.value;
      }
      // res = await this.catServ.addCatgories(body, this.id?.value);
    }

    try {
      console.log('addUpdateDomain', res);

      if (res) {
        if (res) {
          const w = this.crudType === this.crudTypes.add ? 'added' : 'updated';
         
          this.toastr.success('Success!', `Category ${w} successfully.`);
          this.domainForm.reset();
          this.page = 1;
          this.getCategories();
          var myModalEl = document?.getElementById('domainModal')
          var modal = bootstrap.Modal?.getInstance(myModalEl!)
          modal?.hide()
          $('domainModal')?.modal('hide');
        } else {
          const w = this.crudType === this.crudTypes.add ? 'Adding' : 'Updating';
          this.toastr.error('Oh Snap!', res?.message || `${w} domain failed`);
        }
      }
    } catch (err) {
      console.error(err);
      this.toastr.error('Oh Snap!', 'Server Error');
    } finally {
      this.isRequesting = false;
    }
  }

  deleteDomain(id:any) {
    console.log(id);


    this.catServ
      .deleteDomain(id)
      .then((res) => {
        console.log('deleteDomain', res);

        if (res) {
          if (res) {
           
            this.toastr.success('Success!', 'Category deleted Successfully');
            this.getCategories();
          } else {
            this.toastr.error('Oh Snap!', res?.message || 'Deleting domain failed');
          }
        }
      })
      .catch((err) => {
        console.error(err);
        this.toastr.error('Oh Snap!', 'Server Error');
      })
      .finally(() => {
        this.isRequesting = false;
      });
  }

  openModal(id: string,type:string) {

     this.crudType = type;

    var myModalEl = document?.getElementById('domainModal')
    var modal = bootstrap.Modal?.getInstance(myModalEl!)
    modal?.show()
    $(id)?.modal('show');
    this.activeModalId = id;
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

 
}
