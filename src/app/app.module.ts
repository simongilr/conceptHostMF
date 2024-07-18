import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { RouterModule, Routes } from '@angular/router'; 
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { JwtModule } from '@auth0/angular-jwt';

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
  imports: [BrowserModule, 
    RouterModule.forRoot(routes), 
    IonicModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })

  
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
