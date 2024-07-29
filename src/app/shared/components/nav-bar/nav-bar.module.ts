import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
//import { LoginComponent } from '../login/login.component';
import { HomePageRoutingModule } from '../../../admin/home/home-routing.module';

import { LoginComponent } from '../login/login.component';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [NavBarComponent, LoginComponent], 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginModule
  ],
  exports: [NavBarComponent],
})
export class NavBarModule { }


