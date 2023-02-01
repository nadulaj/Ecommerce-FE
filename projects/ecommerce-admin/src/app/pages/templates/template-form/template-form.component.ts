import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';

import { CRUD_TYPES } from '../../../keys';
import { TemplateAttributesType, TemplateType } from '../../../@core/models/types';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  @ViewChild(FileUploadComponent, { static: true }) fileUploadComponentRef?: FileUploadComponent;

  crudTypes = CRUD_TYPES;
  formTypes = {
    template: 'template',
    attribute: 'attribute',
  };

  @Input() modalId: string = '';
  @Input() isLoading: boolean = false;
  @Input() crudType = CRUD_TYPES.add;

  @Output() submitForm = new EventEmitter();

  crudTypeAttr = CRUD_TYPES.add;
  templateForm: FormGroup;
  templateAttributesForm: FormGroup;
  attributes: TemplateAttributesType[] = [];
  displayAFIsActive: boolean = true;

  constructor(private fb: FormBuilder) {
    this.templateForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      url: ['', Validators.required],
      description: '',
      image: '',
      is_active: false,
      template_attributes: '',
    });

    this.templateAttributesForm = this.fb.group({
      a_temp_id: '',
      a_id: '',
      a_name: ['', Validators.required],
      a_description: ['', Validators.required],
      a_is_active: false,
    });
  }

  // template form fields
  get id() {
    return this.templateForm.get('id');
  }
  get name() {
    return this.templateForm.get('name');
  }
  get url() {
    return this.templateForm.get('url');
  }
  get description() {
    return this.templateForm.get('description');
  }
  get image() {
    return this.templateForm.get('image');
  }
  get is_active() {
    return this.templateForm.get('is_active');
  }
  get template_attributes() {
    return this.templateForm.get('template_attributes');
  }

  // template attributes form fields
  get a_temp_id() {
    return this.templateAttributesForm.get('a_temp_id');
  }
  get a_id() {
    return this.templateAttributesForm.get('a_id');
  }
  get a_name() {
    return this.templateAttributesForm.get('a_name');
  }
  get a_description() {
    return this.templateAttributesForm.get('a_description');
  }
  get a_is_active() {
    return this.templateAttributesForm.get('a_is_active');
  }

  ngOnInit(): void {}

  /**
   * set the editing template when parent trigger edit
   *
   * @param template - template object needs to edit
   */
  setTemplate(template: TemplateType) {
    this.templateForm.setValue({
      id: template?.id || '',
      name: template?.name || '',
      url: template?.url || '',
      description: template?.description || '',
      image: '',
      is_active: template?.is_active || false,
      template_attributes: template?.template_attributes || [],
    });
    this.attributes = template?.template_attributes!;
  }

  submitHandler() {
    // trigger validations
    Object.keys(this.templateForm.controls).forEach((field) => {
      const control = this.templateForm.get(field);
      control?.markAllAsTouched();
    });

    if (!this.templateForm.valid) return;

    let attributes: TemplateAttributesType[] = Object.assign([], this.attributes);
    attributes.forEach((a) => {
      delete a['temp_id'];
      // delete a['is_active'];
      if (this.crudTypeAttr === this.crudTypes.update) {
        a['is_delete'] = 0;
      }
    });

    let template: TemplateType = {
      name: this.name?.value,
      url: this.url?.value,
      description: this.description?.value,
      is_active: this.is_active?.value ? 1 : 0,
      is_published: 1,
    };
    if (attributes) {
      template.custom_attributes = attributes;
    }
    if (this.image?.value) {
      template.image = this.image.value;
    }
    if (this.crudType === this.crudTypes.update) {
      template.id = this.id?.value;
    }

    // console.log(template);
    // return;
    this.submitForm.emit(template);
  }

  addUpdateAttribute() {
    // // trigger validations
    // Object.keys(this.templateAttributesForm.controls).forEach((field) => {
    //   const control = this.templateAttributesForm.get(field);
    //   control?.markAllAsTouched();
    // });

    // if (!this.templateAttributesForm.valid) return;

    // if (this.crudTypeAttr === this.crudTypes.add) {
    //   // add
    //   let attrs: TemplateAttributesType[] = Object.assign([], this.attributes);
    //   let newAttr: TemplateAttributesType = {
    //     temp_id: Date.now(),
    //     name: this.a_name?.value,
    //     description: this.a_description?.value,
    //     is_active: this.a_is_active?.value ? 1 : 0,
    //   };
    //   if (this.id?.value) {
    //     // newAttr.id = this.id.value;
    //   }
    //   attrs.push(newAttr);
    //   this.attributes = attrs;
    // } else {
    //   // update
    //   let attr = this.attributes.find((a) => {
    //     if (a.temp_id) {
    //       return this.a_temp_id?.value === a.temp_id;
    //     } else {
    //       return this.a_id?.value === a.id;
    //     }
    //   });
    //   if (attr) {
    //     attr.name = this.a_name?.value;
    //     attr.description = this.a_description?.value;
    //     attr.is_active = this.a_is_active?.value ? 1 : 0;
    //   }
    // }

    // this.templateAttributesForm.reset();
    // $('#templateAttrModal').modal('hide');

    // // scroll to template attributes section smoothly
    // const div = document.getElementById('templates-attributes-div');
    // div?.scrollIntoView({ behavior: 'smooth' });
  }

  deleteAttr(attr: TemplateAttributesType) {
    let attrs: TemplateAttributesType[] = Object.assign([], this.attributes);
    attrs = attrs.filter((a) => {
      if (a.temp_id) {
        return a.temp_id !== attr.temp_id;
      } else {
        return a.id !== attr.id;
      }
    });
    this.attributes = attrs;
  }

  /**
   * on template image changes
   */
  onImageChange(file: any) {
    if (!file || Array.isArray(file) || typeof file !== 'object') {
      this.image?.setValue('');
      return;
    }

    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => {
      this.image?.setValue(render.result);
    };
  }

  openModal(id: string, type: string = this.crudTypes.add, attr?: TemplateAttributesType) {
    // this.crudTypeAttr = type;

    // if (type === this.crudTypes.add) {
    //   this.a_is_active?.setValue(true);
    //   this.displayAFIsActive = false;
    // }

    // if (type === this.crudTypes.update) {
    //   this.templateAttributesForm.setValue({
    //     a_temp_id: attr?.temp_id || Date.now(),
    //     a_id: attr?.id || '',
    //     a_name: attr?.name,
    //     a_description: attr?.description,
    //     a_is_active: attr?.is_active === 1 && true,
    //   });
    //   if (attr?.id) {
    //     this.displayAFIsActive = true;
    //   } else {
    //     this.displayAFIsActive = false;
    //   }
    // }

    // $(id)?.modal('show');

    // // change second modal and backdrop z-index
    // // so, it will be top of first modal
    // const modal = document.getElementById('templateAttrModal');
    // const backdrops = document.querySelectorAll('.modal-backdrop');

    // modal?.classList.add('modal-top');
    // if (backdrops.length > 1) {
    //   backdrops[1].classList.add('backdrop-top');
    // }
  }

  isFieldValid(fieldName: string, formType = this.formTypes.template): boolean {
    let form = this.templateForm;

    if (formType === this.formTypes.attribute) {
      form = this.templateAttributesForm;
    }

    const field = form.get(fieldName);

    if (field && field.touched && field.errors) {
      return false;
    }
    return true;
  }

  getFieldClass(fieldName: string, formType = this.formTypes.template): string {
    let form = this.templateForm;

    if (formType === this.formTypes.attribute) {
      form = this.templateAttributesForm;
    }
    const field = form.get(fieldName);

    if (field && (field.touched || field.dirty)) {
      if (field.invalid || field.errors) {
        return 'is-invalid';
      } else {
        return 'is-valid';
      }
    }
    return '';
  }

  /**
   * reset component to default state
   */
  resetModal() {
    this.templateForm.reset();
    this.fileUploadComponentRef?.reset();
    this.attributes = [];
  }

  /**
   * reset forms to default state
   *
   * @param formType - which form to reset
   */
  resetForm(formType = this.formTypes.template) {
    if (formType === this.formTypes.template) {
      this.resetModal();
    } else {
      this.templateAttributesForm.reset();
    }
  }
}
