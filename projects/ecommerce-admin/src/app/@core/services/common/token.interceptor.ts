import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { CommonService } from '..';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public cs: CommonService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('user/login_admin/')) {
      return next.handle(request);
    }

    if (request.url.includes('token/refresh/')) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cs.getToken()}`,
      },
    });
    return next.handle(request);
  }
}
