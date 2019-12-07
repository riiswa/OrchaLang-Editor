import { Component, OnInit } from '@angular/core';
import {CodeService} from '../code.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent implements OnInit {

  constructor(public codeService: CodeService) { }

  ngOnInit() {
  }

  onChangeField($event: string, indice: number) {
    this.codeService.files[indice].name = $event;
    this.codeService.updateCookie();
  }

}
