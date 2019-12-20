import {Component, OnInit} from '@angular/core';
import {CodeService} from '../code.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'],
})
export class ExplorerComponent implements OnInit {
  visible = true;

  constructor(public codeService: CodeService, public breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
  }

  onChangeField($event: string, indice: number) {
    this.codeService.files[indice].name = $event;
    this.codeService.updateCookie();
  }

}
