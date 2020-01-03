import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CodeService} from './code.service';
import {NgTerminal} from 'ng-terminal';

@Injectable({
  providedIn: 'root'
})

export class RunHandlerService {
  url = 'http://localhost:8080/api/orcha';
  terminal: NgTerminal;

  constructor(public http: HttpClient, public codeService: CodeService) { }

  getParameters() {
    const file = this.codeService.files[this.codeService.selectedFile];
    return `fileName=${file.name}&fileContent=${file.content}`;
  }

  send() {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8'
    });
    if (this.codeService.files[this.codeService.selectedFile].content !== '') {
      this.terminal.write(`Try to data to ${this.url}...\n`);
      this.http.post(this.url, this.getParameters(), {headers, responseType: 'text'}).subscribe(res => {
        this.terminal.write(`Successfully connected to ${this.url}\n`);
        this.terminal.write(res);
      },
      error => this.terminal.write(`Connexion fail: ${error.message}\n`)
      );
    } else { this.terminal.write('No data to send.\n'); }
  }
}
