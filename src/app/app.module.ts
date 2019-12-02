import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogComponent } from './log/log.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { MenuComponent } from './menu/menu.component';
import { WriteComponent } from './write/write.component';
import { ConsoleComponent } from './console/console.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
