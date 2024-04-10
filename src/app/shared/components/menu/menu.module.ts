import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './compile.pipe';

@NgModule({
  declarations: [MenuComponent, SafeHtmlPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [MenuComponent  ] // Si deseas exportar el componente para que esté disponible en otros módulos
})
export class MenuModule { }
