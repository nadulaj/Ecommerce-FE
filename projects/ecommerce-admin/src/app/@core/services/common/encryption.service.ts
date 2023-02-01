import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as base64 from 'base-64';
import * as utf8 from 'utf8';

import { ENCRIPTION_KEYS } from '../../../keys';

@Injectable({
  providedIn: 'root',
})
export class EncriptionService {
  request_encript(jsonobj: Object, isBase64: boolean = true): string {
    try {
      let jsonStr = '';

      if (isBase64) {
        jsonStr = this.base64Encoder(jsonobj);
      } else {
        jsonStr = JSON.stringify(jsonobj);
      }
      const ciphertext = this.aes_encrypt(jsonStr, ENCRIPTION_KEYS.key, ENCRIPTION_KEYS.iv);
      return ciphertext;
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  response_decript(response: string, isBase64: boolean = true): unknown {
    try {
      const plaintext = this.aes_decrypt(response, ENCRIPTION_KEYS.key, ENCRIPTION_KEYS.iv);
      if (isBase64) {
        const decoded_plaintext = this.base64Decoder(plaintext);
        return JSON.parse(decoded_plaintext);
      } else {
        return JSON.parse(JSON.stringify(this.repairJson(plaintext), null, 2));
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  aes_encrypt(plaintext: string, key: any, iv: any): string {
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    const srcs = CryptoJS.enc.Utf8.parse(plaintext);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString();
  }

  aes_decrypt(ciphertext: string, key: any, iv: any): string {
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);

    const hex_string = CryptoJS.enc.Hex.parse(ciphertext);
    const srcs = CryptoJS.enc.Base64.stringify(hex_string);
    const decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decrypt2 = decrypt.toString(CryptoJS.enc.Utf8);
    return decrypt2.toString();
  }

  base64Encoder(encoder: any): string {
    try {
      let jsonStr = JSON.stringify(encoder);
      return base64.encode(utf8.encode(jsonStr));
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  base64Decoder(decoder: string): string {
    try {
      return base64.decode(decoder);
      // console.log(utf8.decode(base64.decode(decoder_string)))
      // return utf8.decode(base64.decode(decoder_string))
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  repairJson(data: string): Object {
    let str, obj;
    data = this.replaceAll(data, 'True', 'true');
    data = this.replaceAll(data, 'False', 'false');
    data = this.replaceAll(data, 'None', '""');

    try {
      str = data.replace(/'/g, '"');
      obj = JSON.parse(str);
    } catch (e) {
      try {
        obj = (0, eval)('(' + data + ')');
      } catch (e) {
        console.error(e);
        obj = {};
      }
    }
    return obj;
  }

  replaceAll(str: string, find: string, replace: string): string {
    const escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }
}
