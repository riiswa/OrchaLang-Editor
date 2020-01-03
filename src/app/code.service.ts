import {Injectable, OnInit} from '@angular/core';
import {FileObject} from './utils/File';
import {CookieService} from 'ngx-cookie-service';
import {HistoryService} from './history.service';


@Injectable({
  providedIn: 'root'
})
export class CodeService {
  files: FileObject[] = [];
  cookieName = 'orchalang_editor_content';

  selectedFile = 0;

  content: string;

  constructor(private cookieService: CookieService, private historyService: HistoryService) {

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
    this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
  }

  delete(id) {
    if (confirm('Do you really want to delete this file ?') === true) { // confirm box when deleting files
      this.files.splice(id, 1);
      this.selectedFile = 0;
      if (this.files.length === 0) {
        this.files.push({name: 'untitled.orcha', content: ''});
      }
      this.content = this.files[0].content;
      this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
    }
  }

  add() {
    this.selectedFile = 0;
    this.files.unshift({name: 'untitled.orcha', content: ''});
    this.content = this.files[0].content;
    this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
  }
  private addFileByName(filename, filecontent) {
    this.selectedFile = 0;
    this.files.unshift({name: filename, content: filecontent});
    this.content = this.files[0].content;
    this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
  }
  private download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
  }
  save() {
    this.download(this.files[this.selectedFile].name, this.content);
    this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
  }
  saveAll() {
    this.files.forEach( file => this.download(file.name, file.content));
    this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
  }
  open() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.orcha';

    input.onchange = (e: any) => {

      // getting a hold of the file reference
      const file = e.target.files[0];
      const extension: string = file.name.split('.')[1]; // splitting file name, [0] = name (without extension), [1] = extension
      if (extension === 'orcha') {
        // setting up the reader
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = (readerEvent) => {
          const target: any = readerEvent.target; // forcer le typage en any pour eviter les erreur de compilateur provoque par ts
          const filecontent = target.result;
          const filename = file.name;
          this.addFileByName(filename, filecontent);
        };
      } else {
        alert('Wrong file type ! Please select a .orcha file');
      }
    };
    input.click();
    this.historyService.addStatusToUndoStack(); // Adding status for undo/redo Stacks
  }
}
