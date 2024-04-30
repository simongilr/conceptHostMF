import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { RouterModule, Routes } from '@angular/router'; 
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';

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
