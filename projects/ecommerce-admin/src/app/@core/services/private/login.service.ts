import { Injectable } from '@angular/core';

import { CommonService } from '..';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private cs: CommonService) {}

  login(body: Object): Promise<any> {
    return this.cs.postData(
      'user/login_admin/',
      body,
      false,
      'https://merchant-api-development.onepay.lk/api/'
    );
  }
}
