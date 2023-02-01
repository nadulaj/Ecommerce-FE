import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ComponentModule } from '../components/component.module';

import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ComponentModule,
  ],
  declarations: [AuthenticationComponent, LoginComponent],
  providers: [],
  exports: [LoginComponent],
})
export class AuthenticationModule {}
