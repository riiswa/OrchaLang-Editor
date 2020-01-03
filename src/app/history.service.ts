import { Injectable } from '@angular/core';
import Stack from 'ts-data.stack';
import {FileObject} from './utils/File';
import {CodeService} from './code.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  codeService: CodeService = null;
  undoStack = new Stack<FileObject[]>();
  redoStack = new Stack<FileObject[]>();

  constructor() {}

  undo() {
    if (! this.undoStack.isEmpty()) {
      console.log(this.undoStack.count());
      this.redoStack.push(this.undoStack.pop());
      console.log(this.undoStack.count());
      if (! this.undoStack.isEmpty()) {
        console.log(this.codeService.files);
        console.log(this.undoStack.peek());
        this.codeService.files = this.undoStack.peek().slice();
        console.log(this.codeService.files);
      }
      console.log('UNDO');
    }
  }

  redo() {
    if (! this.redoStack.isEmpty()) {
      this.undoStack.push(this.redoStack.pop());
      this.codeService.files = this.undoStack.peek();
      console.log('REDO');
    }
  }

  addStatusToUndoStack() {
    this.undoStack.push(this.codeService.files.slice());
    this.redoStack = new Stack<FileObject[]>();
    console.log('ADD IN STACK');
  }
}
