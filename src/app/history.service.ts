import Stack from 'ts-data.stack';
import {FileObject} from './utils/File';
import {CodeService} from './code.service';

export class HistoryService {

  undoStack = new Stack<FileObject[]>();
  redoStack = new Stack<FileObject[]>();

  constructor(private codeService: CodeService) {}

  undo() {
    this.codeService.files = this.undoStack.pop();
    this.redoStack.push(this.codeService.files);
  }

  redo() {
    this.codeService.files = this.redoStack.pop();
    this.undoStack.push(this.codeService.files);
  }

  addStatusToUndoStack() {
    this.undoStack.push(this.codeService.files);
    this.redoStack = new Stack<FileObject[]>();
  }
}
