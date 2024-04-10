import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { NavBarComponent } from '../shared/components/nav-bar/nav-bar.component';
import { MenuComponent } from '../shared/components/menu/menu.component';
import { SafeHtmlPipe } from '../shared/components/menu//compile.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
    
  ],
  declarations: [ HomePage ]
})
export class HomePageModule {}
