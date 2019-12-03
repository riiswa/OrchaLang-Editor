import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { MenuComponent } from './menu/menu.component';
import { WriteComponent } from './write/write.component';
import { ConsoleComponent } from './console/console.component';
import {FormsModule} from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';




@NgModule({
  declarations: [
    AppComponent,
    LogComponent,
    ExplorerComponent,
    MenuComponent,
    WriteComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    CodemirrorModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
