import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{

  @ViewChild('miFrame') miFrame!: ElementRef;
  
    src: string = '';
    paginaActual: string = '';
    selectedApp: any;
    idAct: any;
    clickApp: number = 0;
    microfrontends = [
      { id: 1, name: 'Desplegar microfrontend 1', url: 'http://localhost:4200/', classStyle: 'width: 100%; height: 100vh; border: none;' },
      { id: 2, name: 'Desplegar microfrontend 2', url: 'http://localhost:61464/', classStyle: 'width: 100%; height: 100vh; border: none;' },
      { id: 3, name: 'Desplegar microfrontend 3', url: 'http://localhost:56354/', classStyle: 'width: 100%; height: 140vh; border: none;' }
    ];
  
  
    constructor(private menuCtrl: MenuController, private activatedRoute: ActivatedRoute) {}
  
    ngOnInit() {
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
  
  
  