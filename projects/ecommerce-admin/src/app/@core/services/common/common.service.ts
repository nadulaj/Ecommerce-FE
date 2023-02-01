import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { EncriptionService } from '..';
import { environment } from '../../../../environments/environment';
import { TOKENS } from '../../../keys';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  httpHeaders: HttpHeaders;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private es: EncriptionService
  ) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
  }

  async getData(url: string, isBase64: boolean = true): Promise<any> {
    const response = await lastValueFrom(
      this.httpClient.get(environment.apiBaseUrl2 + url)
    )
      .then((res) => {
        return res
      })
      .catch((err) => {
        if (err?.status === 401) {
          this.logOut();
        }
        console.error(err);
      });

    return response;
  }

  async postData(
    url: string,
    body: Object,
    isBase64: boolean = true,
    baseUrl: string = ''
  ): Promise<any> {
    const encryptedBody = this.es.request_encript(body, isBase64);

    let url1 = environment.apiBaseUrl + url;
    if (baseUrl) {
      url1 = baseUrl + url;
    }

    const response = await lastValueFrom(
      this.httpClient.post(url1, encryptedBody, {
        headers: this.httpHeaders,
        responseType: 'text',
      })
    )
      .then((res) => {
        return this.es.response_decript(res, isBase64);
      })
      .catch((err) => {
        if (err?.status === 401) {
          this.logOut();
        }
        console.error(err);
      });

    return response;
  }


  async postData2(
    url: string,
    body: Object,
    isBase64: boolean = false,
    baseUrl: string = ''
  ): Promise<any> {

    let url1 = environment.apiBaseUrl2 + url;
    if (baseUrl) {
      url1 = baseUrl + url;
    }

    const response = await lastValueFrom(
      this.httpClient.post(url1, body)
    )
      .then((res) => {
          return res
      })
      .catch((err) => {
        if (err?.status === 401) {
          this.logOut();
        }
        console.error(err);
      });

    return response;
  }

  async putData(url: string, body: Object, isBase64: boolean = true): Promise<any> {
    const encriptedbody = this.es.request_encript(body, isBase64);

    const response = await lastValueFrom(
      this.httpClient.put(environment.apiBaseUrl + url, encriptedbody, {
        headers: this.httpHeaders,
        responseType: 'text',
      })
    )
      .then((res) => {
        return this.es.response_decript(res, isBase64);
      })
      .catch((err) => {
        if (err?.status === 401) {
          this.logOut();
        }
        console.error(err);
      });

    return response;
  }

  async deleteData(url: string, isBase64: boolean = true): Promise<any> {
    const response = await lastValueFrom(
      this.httpClient.delete(environment.apiBaseUrl2 + url)
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err?.status === 401) {
          this.logOut();
        }
        console.error(err);
      });

    return response;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const userPayload = JSON.parse(atob(token.split('.')[1]));
      if (userPayload) {
        return userPayload.exp > Date.now() / 1000;
      }
    }
    return false;
  }

  logOut(): void {
    // remove any remaining modal backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((b) => {
      b.remove();
    });

    localStorage.removeItem(TOKENS.accessToken);
    this.router.navigate(['/authentication/login']);
  }

  getToken(): any {
    try {
      const token = localStorage.getItem(TOKENS.accessToken);
      if (token) {
        return token;
      }
      this.router.navigate(['/authentication/login']);
      return;
    } catch (error) {
      this.router.navigate(['/authentication/login']);
      return;
    }
  }

  setToken(res: any): void {
    localStorage.setItem(TOKENS.accessToken, res['data']['access_token']);
    localStorage.setItem(TOKENS.refreshToken, res['data']['refresh_token']);
    localStorage.setItem(TOKENS.userData, this.es.request_encript(res['data']['user']));

    this.router.navigate(['/pages/dashboard']);
  }
}
