import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-run-ksql',
  templateUrl: './run-ksql.component.html',
  styleUrls: ['./run-ksql.component.css']
})
export class RunKsqlComponent implements OnInit {

  ksql: string;
  output: string;
  connected: boolean;

  constructor(private httpClient: HttpClient) {
    this.connected = false;
    this.ksql = 'SELECT * FROM users LIMIT 5;';
  }

  ngOnInit() {
  }

  runAsQuery(): void {
    this.output = '';
    const socket = io('/');
    socket.on('result', (result: any) => {
      this.output = Object.values(result.row.columns).join(' | ') + '\n' + this.output;
    });
    socket.on('disconnect', (result: any) => {
      this.connected = false;
    });
    socket.emit('query', this.ksql);
    this.connected = true;
  }

  async runAsStatement(): Promise<void> {
    this.output = '';
    const res = await this.httpClient.post('/ksql', {ksql: this.ksql}).toPromise();
    this.output = JSON.stringify(res, null, 4);
  }
}
