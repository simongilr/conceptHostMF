import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menuCtrl: MenuController, private sanitizer: DomSanitizer) {}

  app: any;
  selectedApp = 2;

  changeApp(on:number) {
    this.selectedApp = on;
    console.log('frame',  this.selectedApp);
  }

  microfrontends = [
    { id: 1, label: 'Desplegar microfrontend 1', url: 'http://localhost:4200/' },
    { id: 2, label: 'Desplegar microfrontend 2', url: 'http://localhost:64383/' },
    { id: 3, label: 'Desplegar microfrontend 3', url: 'http://localhost:56936/' }
  ];

}

