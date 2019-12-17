import {Injectable, OnInit} from '@angular/core';
import {FileObject} from './utils/File';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CodeService {
  files: FileObject[] = [];
  cookieName = 'orchalang_editor_content';

  selectedFile = 0;

  content: string;

  constructor(private cookieService: CookieService) {

    if (this.cookieService.check(this.cookieName)) {
      this.files = JSON.parse(this.cookieService.get(this.cookieName));
    } else {
      this.updateCookie();
    }

    if (this.files.length === 0) {
      this.files.push({name: 'untitled.orcha', content: ''});
    }
    this.content = this.files[this.selectedFile].content;
  }

  updateCookie() {
    this.cookieService.set(this.cookieName, JSON.stringify(this.files));
  }

  delete(id) {
    this.files.splice(id, 1);
    this.selectedFile = 0;
    if (this.files.length === 0) {
      this.files.push({name: 'untitled.orcha', content: ''});
    }
    this.content = this.files[0].content;
  }

  add() {
    this.selectedFile = 0;
    this.files.unshift({name: 'untitled.orcha', content: ''});
    this.content = this.files[0].content;
  }
  private download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  save() {
    this.download(this.files[this.selectedFile].name, this.content);
  }
  saveAll() {
    this.files.forEach( file => this.download(file.name, file.content));
  }
}
