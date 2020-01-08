import {Component, HostListener} from '@angular/core';
import {CodeService} from './code.service';
import {HistoryService} from './history.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrchaLang Editor';
  constructor(public codeService: CodeService, public historyService: HistoryService) {
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

  @HostListener('window:keyup.control.alt.u', ['$event']) // listener for ctrl+alt+u
  undoHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.historyService.undo();
  }

  @HostListener('window:keyup.control.alt.r', ['$event']) // listener for ctrl+alt+r
  redoHandler(event: KeyboardEvent) {
    event.preventDefault(); // override navigator shortcut
    this.historyService.redo();
  }

}
