import {Component, OnInit} from '@angular/core';
import {CodeService} from '../code.service';
import {RunHandlerService} from '../run-handler.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public codeService: CodeService, public runHandler: RunHandlerService) {
  }

  ngOnInit() {
  }
}

