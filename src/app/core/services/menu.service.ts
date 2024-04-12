import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  
    src: string = '';
    paginaActual: string = '';
    selectedApp: any;
    idAct: any;
    clickApp: number = 0;
    microfrontends = [
      { id: 1, name: 'Microfrontend 1', url: 'http://localhost:4200/', classStyle: 'width: 100%; height: 100vh; border: none;' },
      { id: 2, name: 'Microfrontend 2', url: 'http://localhost:51660/', classStyle: 'width: 100%; height: 100vh; border: none;' },
      { id: 3, name: 'Microfrontend 3', url: 'http://localhost:8100/', classStyle: 'width: 100%; height: 140vh; border: none;' }
    ];
  
  
    constructor(private menuCtrl: MenuController, private activatedRoute: ActivatedRoute) {
      this.clickApp = 0;
      this.getUrl();
      window.addEventListener('message', this.handleMessage.bind(this), false);
    }

  
    getUrl() {
      this.idAct = localStorage.getItem('idAct') || '';
      this.selectedApp = parseInt(this.idAct);
      this.paginaActual = localStorage.getItem('paginaActual') || '';
      console.log(this.selectedApp);
    }
  
    handleMessage(event: MessageEvent) {
      const messageData = event.data;
      if (messageData && messageData.url) {
        this.paginaActual = messageData.url;
        localStorage.setItem('paginaActual', this.paginaActual);
      }
    }
  
    changeApp(on:number) {
      this.clickApp = on; 
      this.selectedApp = on;
      localStorage.setItem('idAct', this.selectedApp);
      console.log('frame',  this.selectedApp);
    }
  
  }
  
  
  