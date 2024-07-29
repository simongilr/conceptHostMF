import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { EncryptionService } from '@mflibs/encryption-lib';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  private subscription: Subscription = new Subscription();
  
  @ViewChild('loginComponent', { static: true }) loginComponent!: LoginComponent;

  user: string = 'Loggin';

  constructor(
    private authService: AuthService,
    private encryptionService: EncryptionService
  ) { }

  openLoginModal() {
    this.loginComponent.loginModal.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
