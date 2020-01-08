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

  constructor(public cookieService: CookieService, public historyService: HistoryService) {
    this.historyService.codeService = this;

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
    if (confirm('Do you really want to delete this file ?') === true) { // confirm box when deleting files
      this.files.splice(id, 1);
      this.selectedFile = 0;
      if (this.files.length === 0) {
        this.files.push({name: 'untitled.orcha', content: ''});
      }
      this.content = this.files[0].content;
      this.historyService.addStatusToUndoStack(); // Adding to the redo/undo stack
    }
  }

  add() {
    this.selectedFile = 0;
    this.files.unshift({name: 'untitled.orcha', content: ''});
    this.content = this.files[0].content;
    this.historyService.addStatusToUndoStack(); // Adding to the redo/undo stack
  }
  private addFileByName(filename, filecontent) {
    this.selectedFile = 0;
    this.files.unshift({name: filename, content: filecontent});
    this.content = this.files[0].content;
    this.historyService.addStatusToUndoStack(); // Adding to the redo/undo stack
  }
  private download(filename, text) {
    const element = document.createElement('a'); // créer un elmnt html type a
    // lui donner certains attribut et son contenu
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename); // lui donner son nom pour la propriété de download

    element.style.display = 'none'; // empecher de l'afficher dans la vue
    document.body.appendChild(element); // ajouter au document

    element.click(); // simuler le click

    document.body.removeChild(element); // enlever du document
  }
  save() {
    this.download(this.files[this.selectedFile].name, this.content);
  }
  saveAll() {
    this.files.forEach( file => this.download(file.name, file.content));
  }
  open() {
    const input = document.createElement('input');
    input.type = 'file'; // type file pour pouvoir le charger
    input.accept = '.orcha'; // filtrer l'extension acceptée

    input.onchange = (e: any) => {

      // getting a hold of the file reference
      const file = e.target.files[0];
      const extension: string = file.name.split('.')[1]; // splitting file name, [0] = name (without extension), [1] = extension
      if (extension === 'orcha') {
        // setting up the reader
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8'); // lit le contenu du fichier

        // here we tell the reader what to do when it's done reading...
        reader.onload = (readerEvent) => {
          const target: any = readerEvent.target; // forcer le typage en any pour eviter les erreur de compilateur provoque par ts
          const filecontent = target.result;
          const filename = file.name;
          this.addFileByName(filename, filecontent); // ajouter le fichier a files
        };
      } else {
        alert('Wrong file type ! Please select a .orcha file');
      }
    };
    input.click(); // simuler le click pour lancer l'event
  }

  format() {
    this.content = this.content.replace(/\s+/g, ' ').trim();
  }
}
