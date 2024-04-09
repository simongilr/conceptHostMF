import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

@ViewChild('miFrame') miFrame!: ElementRef;

src: string = '';
paginaActual: string = '';
selectedApp: any;
idAct: any;

constructor(private menuCtrl: MenuController, private activatedRoute: ActivatedRoute) {}



ngOnInit() {
  this.idAct = localStorage.getItem('idAct') || '';
  this.paginaActual = localStorage.getItem('paginaActual') || '';
  window.addEventListener('message', this.handleMessage.bind(this), false);
}

getUrl() {
  console.log('iniciado...');
}


handleMessage(event: MessageEvent) {
  const messageData = event.data;
  if (messageData && messageData.url) {
    this.paginaActual = messageData.url;
    localStorage.setItem('paginaActual', this.paginaActual);

    console.log('URL del iframe recibida:', this.paginaActual);
    // Actualizar la URL del iframe si paginaActual no está vacío
    if (this.paginaActual !== '') {
      this.miFrame.nativeElement.src = this.paginaActual;
    }
  }
}


  changeApp(on:number) {
    this.getUrl();
    this.selectedApp = on;
    localStorage.setItem('idAct', this.selectedApp);
    console.log('frame',  this.selectedApp);
  }

  microfrontends = [
    { id: 1, name: 'Desplegar microfrontend 1', url: 'http://localhost:52480/', classStyle: 'width: 100%; height: 100vh; border: none;' },
    { id: 2, name: 'Desplegar microfrontend 2', url: 'http://localhost:64383/', classStyle: 'width: 100%; height: 100vh; border: none;' },
    { id: 3, name: 'Desplegar microfrontend 3', url: 'http://localhost:52612/', classStyle: 'width: 100%; height: 140vh; border: none;' }
  ];
  

}


