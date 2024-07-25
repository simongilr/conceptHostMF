import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {


  private static SECRET_KEY = 'ADA_ECOSYSTEM_MICROSERVICES';
  private secretKey: CryptoJS.lib.WordArray;


  constructor() {
    this.secretKey = this.generateKey(EncryptionService.SECRET_KEY);

   }

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
  const iv = CryptoJS.enc.Base64.parse(ivBase64);
  const encryptedHexStr = CryptoJS.enc.Base64.parse(encryptedText).toString(CryptoJS.enc.Hex);

  const encrypted = CryptoJS.enc.Hex.parse(encryptedHexStr);


  // Extraer IV y texto cifrado
  const ivHex = encryptedHexStr.substring(0, 32); // Primeros 32 caracteres (16 bytes para el IV en Hex)
  const encryptedHex = encryptedHexStr.substring(32); // Resto del texto cifrado

  const ivWordArray = CryptoJS.enc.Hex.parse(ivHex);
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


/* 
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
 */
  console.log('decryptedText', decrypted);

  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8); // Corrección aquí

  console.log('decryptedText', decryptedText);

  return decryptedText;
}


}



