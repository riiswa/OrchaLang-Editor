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
      this.codeService.files = this.undoStack.pop();
      this.redoStack.push(this.codeService.files);
      console.log('UNDO');
    }
  }

  redo() {
    if (! this.redoStack.isEmpty()) {
      this.codeService.files = this.redoStack.pop();
      this.undoStack.push(this.codeService.files);
      console.log('REDO');
    }
  }

  addStatusToUndoStack() {
    this.undoStack.push(this.codeService.files);
    this.redoStack = new Stack<FileObject[]>();
    console.log('ADD IN STACK');
  }
}
