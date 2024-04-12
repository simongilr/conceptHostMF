import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from './../../../core/services/menu.service'; 


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit{

  @ViewChild('miFrame') miFrame!: ElementRef;
  
  constructor(private menuCtrl: MenuController, private activatedRoute: ActivatedRoute, private menuService: MenuService) {}

    src = this.menuService.src;
    paginaActual = this.menuService.paginaActual;
    selectedApp = this.menuService.selectedApp;
    idAct = this.menuService.idAct;
    clickApp = this.menuService.clickApp;
    microfrontends = this.menuService.microfrontends;
  
    ngOnInit() {
      this.menuService.getUrl();
      window.addEventListener('message', this.handleMessage.bind(this), false);
    }
  
    handleMessage(event: MessageEvent) {
      const messageData = event.data;
      if (messageData && messageData.url) {
        this.menuService.paginaActual = messageData.url;
        localStorage.setItem('paginaActual', this.menuService.paginaActual);
      }
    }
  
    changeApp(on: number) {
      this.menuService.changeApp(on);
      this.clickApp = this.menuService.clickApp;
      this.selectedApp = this.menuService.selectedApp;
    }
  
  }
  
  
  