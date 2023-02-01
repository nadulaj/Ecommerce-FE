import { ModuleWithProviders, NgModule } from '@angular/core';

// gurds
import { AuthGuard } from './guards';

// pipes
import { TruncateTextPipe } from './pipes';

// services
import {
  // common services
  CommonService,
  EncriptionService,
  TokenInterceptor,
  // private services
  LoginService,
  DomainService,
  TemplateService,
} from './services';

export const APPLICATION_GUARDS = [AuthGuard];

export const APPLICATION_PIPES = [TruncateTextPipe];

export const APPLICATION_SERVICES = [
  CommonService,
  EncriptionService,
  TokenInterceptor,
  LoginService,
  DomainService,
  TemplateService,
];

@NgModule({
  declarations: [APPLICATION_PIPES],
  imports: [],
  exports: [...APPLICATION_PIPES],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...APPLICATION_GUARDS, ...APPLICATION_PIPES, ...APPLICATION_SERVICES],
    };
  }
}
