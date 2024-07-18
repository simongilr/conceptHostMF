import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service'; // Ajusta la ruta según tu estructura de carpetas


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

  @ViewChild('modal') modal: any;



  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.msg = 'Login exitoso';

        setTimeout(() => {
          this.modal.dismiss();
          this.msg = '';
          this.username  = '';
          this.password  = '';
        }, 1200);

      },
      error => {
        this.alert = 'Usuario o contraseña incorrectos';
        console.error('Error al hacer login', error);
      }
    );
  }


}
