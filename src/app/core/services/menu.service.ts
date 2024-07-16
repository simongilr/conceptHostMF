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
      { id: 1, name: 'SICOF', url: 'http://localhost:4800/', classStyle: 'margin-top: -20px; width: 102%; height: 100vh; border: none; overflow-x: hidden !important;  overflow: hidden !important;',  icon: 'paper-plane-outline', colorIcon: 'warning'},
      { id: 2, name: 'CONTRATISTA', url: 'http://localhost:4200/', classStyle: 'position: fixed; top: 55px; left: -10px; width: 100%; height: 100vh; border: none;', icon:'newspaper-outline',  colorIcon: 'danger'},
      { id: 3, name: 'SICOF APP', url: 'http://localhost:8100/', classStyle: 'margin-top: 10px; width: 100%; height: 130vh; border: none;', icon: 'star', colorIcon: 'success' },
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
  
  
  