import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service'; // Ajusta la ruta según tu estructura de carpetas
//import { EncryptionService } from '../../../shared/services/encryption.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { EncryptionService } from '@mflibs/encryption-lib';   


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  private subscription: Subscription = new Subscription();


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
    const service = this.encryptionService;
    const { encryptedText, iv } = service.encrypt(this.username);
    const hashPassword = service.generateHash(this.password);

    console.log('Password hash:', hashPassword);
    console.log('Encrypted Text:', encryptedText);
    console.log('IV:', iv);

    this.subscription.add(
      this.authService.login(encryptedText, hashPassword, iv).pipe(
        tap(response => {
          console.log('Login exitoso', response);
          this.msg = 'Login exitoso';
          this.user = this.username;

          setTimeout(() => {
            this.modal.dismiss();
            this.msg = '';
            this.username = '';
            this.password = '';
          }, 1000);
        }),
        catchError(error => {
          this.alert = 'Usuario o contraseña incorrectos';
          console.error('Error al hacer login', error);

          // Si deseas desencriptar en caso de error, puedes hacerlo aquí
          const decryptedText = service.decrypt(encryptedText, iv);
          console.log('Decrypted Text:', decryptedText);

          // Retorna un observable vacío para completar la cadena de observables
          return of(null);
        })
      ).subscribe()
    );
  }

  ngOnDestroy() {
    // Limpiar todas las suscripciones cuando el componente se destruye
    this.subscription.unsubscribe();
  }
}

