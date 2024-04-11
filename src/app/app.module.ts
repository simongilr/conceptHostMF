import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { RouterModule, Routes } from '@angular/router'; 
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SafeHtmlPipe } from './shared/components/menu/compile.pipe';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./admin/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), IonicModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
