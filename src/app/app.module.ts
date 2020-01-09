import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { MenuComponent } from './menu/menu.component';
import { WriteComponent } from './write/write.component';
import { ConsoleComponent } from './console/console.component';
import {FormsModule} from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CookieService } from 'ngx-cookie-service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';


import { NgTerminalModule } from 'ng-terminal';
import {HttpClientModule} from '@angular/common/http';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    MenuComponent,
    WriteComponent,
    ConsoleComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    CodemirrorModule,
    BrowserAnimationsModule,
    NgTerminalModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
