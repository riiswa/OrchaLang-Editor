import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeMirrorOptionService {
  themes = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard',
    'cobalt', 'colorforth', 'darcula', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'gruvbox-dark',
    'hopscotch', 'icecoder', 'idea', 'isotope', 'lesser-dark', 'liquibyte', 'lucario', 'material-darker', 'material-ocean',
    'material-palenight', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'moxer', 'neat', 'neo', 'night', 'nord', 'oceanic-next',
    'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'shadowfox', 'solarized', 'ssms',
    'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti',
    'yonce', 'zenburn'];

  cm: object;
  theme = 'eclipse';
  mode = true;
  vim = false;

  constructor() {
  }

  updateTheme() {
    // @ts-ignore
    this.cm.setOption('theme', this.theme);
  }

  updateMode() {
    if (this.mode) {
      // @ts-ignore
      this.cm.setOption('mode', 'orchalang');
    } else {
      // @ts-ignore
      this.cm.setOption('mode', '');
    }
  }

  updateVim() {
    if (this.vim) {
      // @ts-ignore
      this.cm.setOption('keyMap', 'vim');
    } else {
      window.location.reload();
    }
  }
}
