import {Component, OnInit} from '@angular/core';
import 'node_modules/codemirror/mode/javascript/javascript.js';
import 'node_modules/codemirror/mode/markdown/markdown.js';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  content: string;

  constructor() {
  }

  ngOnInit() {
  }
}
