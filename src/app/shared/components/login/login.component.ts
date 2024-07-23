import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service'; // Ajusta la ruta según tu estructura de carpetas


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  encryptionService: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  username: string = '';
  password: string = '';
  msg: string = '';
  alert: string = 'Debe loguearse para continuar';

  @ViewChild('modal') modal: any;


  login() {
    const iv = this.encryptionService.generateIv().toString();
    this.authService.login(this.username, this.password, iv).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.msg = 'Login exitoso';

        // Emitir evento o realizar alguna acción para notificar al NavBarComponent sobre el login exitoso
        // Por ejemplo, usando un servicio compartido o un Output EventEmitter

        setTimeout(() => {
          this.modal.dismiss();
          this.msg = '';
          this.username = '';
          this.password = '';
        }, 1000);

      },
      error => {
        this.alert = 'Usuario o contraseña incorrectos';
        console.error('Error al hacer login', error);
      }
    );
  }

}
