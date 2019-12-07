import { Component, OnInit } from '@angular/core';
import {CodeService} from '../code.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private codeService: CodeService) { }

  ngOnInit() {
  }
}

