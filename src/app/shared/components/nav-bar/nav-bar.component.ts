import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  user: string = 'Loggin';

  @ViewChild('modal', { static: true }) modal!: IonModal;

  openLoginModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }
}
