import { Component, OnDestroy, ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { EncryptionService } from '@mflibs/encryption-lib';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  
 // @ViewChild('loginModal', { static: true }) loginModal!: ElementRef;

  username: string = '';
  password: string = '';
  msg: string = '';
  alert: string = 'Debe loguearse para continuar';
  //@ViewChild('loginModal', { static: true }) loginModal!: IonModal;

  @ViewChild(IonModal) loginModal!: IonModal;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private authService: AuthService,
    private encryptionService: EncryptionService
  ) {}

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

          setTimeout(() => {
            this.closeModal.emit();
            this.msg = '';
            this.username = '';
            this.password = '';
          }, 1000);
        }),
        catchError(error => {
          this.alert = 'Usuario o contraseña incorrectos';
          console.error('Error al hacer login', error);

          const decryptedText = service.decrypt(encryptedText, iv);
          console.log('Decrypted Text:', decryptedText);

          return of(null);
        })
      ).subscribe()
    );
  }
  
  onCloseModal() {
    this.closeModal.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
