import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgTerminal } from 'ng-terminal';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit, AfterViewInit {
  @ViewChild('term', { static: true }) child: NgTerminal;
  constructor() { }
  ngAfterViewInit() {

  }


  ngOnInit() {
  }

}
