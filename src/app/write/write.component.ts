import {Component, OnInit} from '@angular/core';
import 'node_modules/codemirror/mode/javascript/javascript.js';
import 'node_modules/codemirror/mode/markdown/markdown.js';
import {CodeService} from '../code.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  cookieName: 'orchalang_editor_content'

  constructor(private codeService: CodeService, private cookieService: CookieService) {}

  ngOnInit() {
    if (this.cookieService.check(this.cookieName)) {
      this.codeService.content = this.cookieService.get(this.cookieName);
    } else {
      this.cookieService.set(this.cookieName, this.codeService.content);
    }
  }

  onChange() {
    this.cookieService.set(this.cookieName, this.codeService.content);
  }

}
