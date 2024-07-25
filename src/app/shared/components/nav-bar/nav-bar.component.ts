import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service'; // Ajusta la ruta según tu estructura de carpetas
import { EncryptionService } from '../../../shared/services/encryption.service';
//import { EncryptionService } from '@mflibs/encryption-lib';   



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {

  username: string = '';
  password: string = '';
  msg: string = '';
  alert: string = 'Debe loguearse para continuar';
  user: string = 'Loggin';

  @ViewChild('modal') modal: any;

  encryptedText: string = '';
  decryptedText: string = '';

  constructor(
    private authService: AuthService,
    private encryptionService: EncryptionService

  ) { }

  login() {

      const service = new EncryptionService();
      const { encryptedText, iv } = service.encrypt(this.username);
      console.log('Encrypted Text:', encryptedText);
      console.log('IV:', iv);

    this.authService.login(encryptedText, this.password, iv.toString()).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.msg = 'Login exitoso';

        this.user = this.username;
        
        setTimeout(() => {
          this.modal.dismiss();
          this.msg = '';
          this.username  = '';
          this.password  = '';
        }, 1000);

        
      },
      error => {
        this.alert = 'Usuario o contraseña incorrectos';
        console.error('Error al hacer login', error);

        const decryptedText = service.decrypt(encryptedText, iv);
        console.log('Decrypted Text:', decryptedText);

      }
    );
  }


}
