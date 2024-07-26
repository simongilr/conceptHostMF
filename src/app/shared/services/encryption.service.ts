import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {


  private static SECRET_KEY = 'ADA_ECOSYSTEM_MICROSERVICES';

  constructor() {}

   // Método para generar una clave SHA-256
   private generateKey(secret: string): CryptoJS.lib.WordArray {
    const key = CryptoJS.enc.Utf8.parse(secret);
    return CryptoJS.SHA256(key);
  }

  // Método para generar un IV aleatorio
  generateIv(): CryptoJS.lib.WordArray {
    return CryptoJS.lib.WordArray.random(16); // AES block size
  }

 // Método para encriptar un texto usando AES
 encrypt(text: string): { encryptedText: string, iv: string } {
  const iv = this.generateIv();
  const key = this.generateKey(EncryptionService.SECRET_KEY);

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // Concatenar IV y texto cifrado
  const ivBytes = iv.toString(CryptoJS.enc.Hex);
  const encryptedBytes = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  const encryptedTextWithIv = ivBytes + encryptedBytes;

  return {
    encryptedText: CryptoJS.enc.Hex.parse(encryptedTextWithIv).toString(CryptoJS.enc.Base64),
    iv: iv.toString(CryptoJS.enc.Base64)
  };
}

decrypt(encryptedText: string, ivBase64: string): string {
  const key = this.generateKey(EncryptionService.SECRET_KEY);
  const encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedText).toString(CryptoJS.enc.Hex);

  // Extraer IV
 // const ivHex = encryptedHexStr.substring(0, 32); 
  //const ivWordArray = CryptoJS.enc.Hex.parse(ivHex);

  const encryptedHex = encryptedHexStr.substring(32); 
  const ivWordArray = CryptoJS.enc.Base64.parse(ivBase64);
  const encryptedWordArray = CryptoJS.enc.Hex.parse(encryptedHex);

    // Crear objeto CipherParams
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedWordArray,
      iv: ivWordArray
    });

    // Desencriptar el texto
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivWordArray
    });

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8); // Corrección aquí
  return decryptedText;
  }

  // Método para generar un hash usando SHA-256
  generateHash(text: string): string {
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
  }


}



