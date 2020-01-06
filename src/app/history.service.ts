import { Injectable } from '@angular/core';
import Stack from 'ts-data.stack';
import {FileObject} from './utils/File';
import {CodeService} from './code.service';
import * as cloneDeep from 'lodash/cloneDeep';

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
      this.redoStack.push(this.undoStack.pop());
      if (! this.undoStack.isEmpty()) {
        this.codeService.files = cloneDeep(this.undoStack.peek());
      }
    }
  }

  redo() {
    if (! this.redoStack.isEmpty()) {
      this.undoStack.push(this.redoStack.pop());
      this.codeService.files = this.undoStack.peek();
    }
  }
  addStatusToUndoStack() {
    this.undoStack.push(cloneDeep(this.codeService.files));
    this.redoStack = new Stack<FileObject[]>();
  }
}
