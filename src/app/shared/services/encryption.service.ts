import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {


  private static SECRET_KEY = 'ADA_ECOSYSTEM_MICROSERVICES';
  private static ALGORITHM = CryptoJS.HmacSHA256;
  private secretKey: CryptoJS.lib.WordArray;

  constructor() {
    this.secretKey = this.generateKey(EncryptionService.SECRET_KEY);

   }

     // Método para generar una clave HMAC256
  private generateKey(secret: string): CryptoJS.lib.WordArray {
    return EncryptionService.ALGORITHM(secret, secret);
  }

  // Método para generar un IV aleatorio
  generateIv(): CryptoJS.lib.WordArray {
    return CryptoJS.lib.WordArray.random(16); // AES block size
  }

  // Método para encriptar un texto usando AES-256
  encrypt(text: string): { encryptedText: string, iv: string } {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey.toString());
    const iv = this.generateIv();
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const encryptedText = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    return { encryptedText: encryptedText, iv: iv.toString(CryptoJS.enc.Base64) };
  }
  // Método para desencriptar un texto usando AES-256
  decrypt(encryptedText: string, ivBase64: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey.toString());
    const iv = CryptoJS.enc.Base64.parse(ivBase64);
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedText);

    // Crear un objeto CipherParams manualmente
    const cipherParams = {
      ciphertext: ciphertext,
      key: key,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    } as unknown as CryptoJS.lib.CipherParams;

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

