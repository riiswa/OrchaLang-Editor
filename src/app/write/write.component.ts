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
  content: string;
  cookieName: 'orchalang_editor_content'

  constructor(private codeService: CodeService, private cookieService: CookieService) {}

  ngOnInit() {
    this.getContent();
    if (this.cookieService.check(this.cookieName)) {
      this.content = this.cookieService.get(this.cookieName);
    } else {
      this.cookieService.set(this.cookieName, this.content);
    }
  }

  getContent(): void {
    this.codeService.getContent().subscribe(content => this.content = content);
  }

  onChange() {
    this.codeService.setContent(this.content);
    this.cookieService.set(this.cookieName, this.content);
    console.log(this.content);
  }

}
