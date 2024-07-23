import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginModule } from '../login/login.module'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginModule // Asegúrate de importar LoginModule aquí
  ],
  exports: [NavBarComponent]
})
export class NavBarModule { }