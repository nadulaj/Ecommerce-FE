import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CommonService, LoginService } from '../../@core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isRequesting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private ls: LoginService,
    private cs: CommonService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')],
      ],
      password: ['', Validators.required],
    });
  }

  // login form fields
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    // if user already logged in, redirect to dashboard page
    if (this.cs.isLoggedIn()) {
      this.router.navigate(['/pages/dashboard']);
    }
  }

  login() {
    if (this.isRequesting || !this.loginForm.valid) return;
    this.isRequesting = true;

    this.ls
      .login(this.loginForm.value)
      .then((res) => {
        // console.log('login', res);

        if (res?.status === 100) {
          this.toastr.success('Welcome!', 'Signed in successfully');
          this.cs.setToken(res);
        } else {
          this.toastr.error('Oh Snap!', res?.message || 'Sign in failed');
        }
      })
      .catch((err) => {
        this.toastr.error('Oh Snap!', 'Server Error');
        console.error(err);
      })
      .finally(() => (this.isRequesting = false));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);

    if (field && field.touched && field.errors) {
      return false;
    }
    return true;
  }

  getFieldClass(fieldName: string): string {
    const field = this.loginForm.get(fieldName);

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
