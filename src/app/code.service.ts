import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {WriteComponent} from './write/write.component';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  content: string;

  constructor() {
  }

  getContent(): Observable<string> {
    return of(this.content);
  }


  setContent(content) {
    this.content = content;
  }
}
