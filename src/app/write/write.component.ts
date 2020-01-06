import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CodeService} from '../code.service';

import 'src/assets/js/orchalang.js';
import 'node_modules/codemirror/addon/search/search.js';
import 'node_modules/codemirror/addon/search/searchcursor.js';
import 'node_modules/codemirror/addon/search/jump-to-line.js';
import 'node_modules/codemirror/addon/dialog/dialog.js';
import 'node_modules/codemirror/addon/display/fullscreen.js';
import 'node_modules/codemirror/addon/hint/show-hint';
import 'node_modules/codemirror/addon/hint/javascript-hint';
import 'node_modules/codemirror/addon/hint/anyword-hint.js';
import 'node_modules/codemirror/addon/lint/lint.js';
import 'src/assets/js/orchalang-lint.js';

import * as CodeMirror from 'codemirror';
import {HistoryService} from '../history.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit, AfterViewInit {
  cm: object;
  options: any = {
    lineNumbers: true,
    theme: 'eclipse',
    mode: 'orchalang',
    lineWrapping: true,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
    extraKeys: {
      F11(cm) {
        if (!cm.getOption('fullScreen')) {
          cm.setOption('fullScreen', true);
        } else {
          cm.setOption('fullScreen', false);
        }
      },
      Esc(cm) {
        if (cm.getOption('fullScreen')) {
          cm.setOption('fullScreen', false);
        }
      },
      'Ctrl-Space': 'autocomplete'
    }
  };
  badgesIsEnable = true;

  constructor(public codeService: CodeService, public historyService: HistoryService) {
  }

  ngOnInit() {
  }

  onChange() {
    this.codeService.updateCookie();
    this.codeService.files[this.codeService.selectedFile].content = this.codeService.content;
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

  toLight() {
    // @ts-ignore
    this.cm.setOption('theme', 'elegant');
  }

  toDark() {
    // @ts-ignore
    this.cm.setOption('theme', 'midnight');
  }

  fullScreen() {
    // @ts-ignore
    if (!this.cm.getOption('fullScreen')) {
      // @ts-ignore
      this.cm.setOption('fullScreen', true);
    } else {
      // @ts-ignore
      this.cm.setOption('fullScreen', false);
    }
  }
}
