import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

@Component({
  selector: 'app-run-ksql',
  templateUrl: './run-ksql.component.html',
  styleUrls: ['./run-ksql.component.css']
})
export class RunKsqlComponent implements OnInit {

  ksql: string;
  output: string;
  connected: boolean;
  socket: Socket;

  constructor(private httpClient: HttpClient) {
    this.connected = false;
    this.ksql = 'SELECT * FROM users LIMIT 5;';
  }

  ngOnInit() {
  }

  runAsQuery(): void {
    this.disconnectSafe();

    this.output = '';
    this.socket = io('/');
    this.socket.on('result', (result: any) => {
      let toAdd = '';
      if (result.message) {
        toAdd = result.message;
      } else if (result.row && result.row.columns) {
        toAdd = Object.values(result.row.columns).join(' | ');
      } else if (result.errorMessage) {
        toAdd = result.errorMessage.message;
      } else {
        toAdd = JSON.stringify(result, null, 2);
      }
      this.output = toAdd + '\n' + this.output;
    });
    this.socket.on('disconnect', (result: any) => {
      this.connected = false;
    });
    this.socket.emit('query', this.ksql);
    this.connected = true;
  }

  disconnectSafe(): void {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  async runAsStatement(): Promise<void> {
    this.output = '';
    const res = await this.httpClient.post('/ksql', {ksql: this.ksql}).toPromise();
    this.output = JSON.stringify(res, null, 4);
  }
}
