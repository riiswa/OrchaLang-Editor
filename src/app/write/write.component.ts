import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CodeService} from '../code.service';
import {CookieService} from 'ngx-cookie-service';

import 'src/assets/js/orchalang.js';
import 'node_modules/codemirror/addon/search/search.js';
import 'node_modules/codemirror/addon/search/searchcursor.js';
import 'node_modules/codemirror/addon/search/jump-to-line.js';
import 'node_modules/codemirror/addon/dialog/dialog.js';
import 'node_modules/codemirror/addon/display/fullscreen.js';
import 'node_modules/codemirror/addon/hint/show-hint';
import 'node_modules/codemirror/addon/hint/javascript-hint';
import 'node_modules/codemirror/addon/hint/anyword-hint.js';

import * as CodeMirror from 'codemirror';


@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit, AfterViewInit {
  cm: object;
  cookieName = 'orchalang_editor_content';
  fullScreen = false;
  options: any =  {
    lineNumbers: true,
    theme: 'eclipse',
    mode: 'orchalang',
    lineWrapping: true,
    extraKeys: {
      F11(cm) {
        if (!cm.getOption('fullScreen')) {
          cm.setOption('fullScreen', true);
        } else {
          cm.setOption('fullScreen', false);
        }
      },
      Esc(cm) {
        if (cm.getOption('fullScreen')) { cm.setOption('fullScreen', false); }
      },
      'Ctrl-Space': 'autocomplete'
    }
  };
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

  ngAfterViewInit(): void {
    // @ts-ignore
    this.cm = document.querySelector('.CodeMirror').CodeMirror;
    // @ts-ignore
    const orig = CodeMirror.hint.anyword;
    // @ts-ignore
    CodeMirror.hint.anyword = cm => {
      const inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
      const from = orig(cm).from.ch;
      const to = orig(cm).to.ch;
      const keywords = ['receive', 'from', 'compute', 'when', 'send', 'to', 'with', 'condition', 'terminates', 'fails', 'and', 'or', 'not'];
      if ('' !== this.codeService.content.substring(from, to)) {
        keywords.forEach(keyword => {
          if (keyword.startsWith(this.codeService.content.substring(from, to))) {
            inner.list.unshift(keyword);
          }
        });
      }
      return inner;
    };
    // @ts-ignore
    this.cm.showHint({hint: CodeMirror.hint.anyword});
  }
}
