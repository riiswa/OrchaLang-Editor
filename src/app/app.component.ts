import {AfterViewInit, Component, HostListener} from '@angular/core';
import {CodeService} from './code.service';
import {HistoryService} from './history.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'OrchaLang Editor';
  loading = true;
  constructor(public codeService: CodeService, public historyService: HistoryService) {
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngAfterViewInit() {
    await this.delay(1000);
    this.loading = false;
  }


  @HostListener('window:keydown.control.e', ['$event']) // listener for ctrl+e
  exportHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.codeService.save();
  }

  @HostListener('window:keydown.control.shift.e', ['$event']) // listener for ctrl+maj+e
  exportAllHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.codeService.saveAll();
  }

  @HostListener('window:keydown.control.o', ['$event']) // listener for ctrl+o
  openHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.codeService.open();
  }

  @HostListener('window:keyup.control.alt.n', ['$event']) // listener for ctrl+alt+n
  newHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.codeService.add();
  }

  // @HostListener('window:keyup.control.atl.c', ['$event']) // listener for ctrl+alt+c
  // copyHandler(event: KeyboardEvent) {
  //   event.preventDefault(); // override navigator shortcut
  //   this.codeService.copy();
  // }

  // @HostListener('window:keyup.control.alt.v', ['$event']) // listener for ctrl+alt+v
  // pasteHandler(event: KeyboardEvent) {
  //   event.preventDefault(); // override navigator shortcut
  //   this.codeService.paste();
  // }

  @HostListener('window:keyup.control.alt.u', ['$event']) // listener for ctrl+alt+r
  undoHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.historyService.undo();
  }

  @HostListener('window:keyup.control.alt.r', ['$event']) // listener for ctrl+alt+u
  redoHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.historyService.redo();
  }


}
