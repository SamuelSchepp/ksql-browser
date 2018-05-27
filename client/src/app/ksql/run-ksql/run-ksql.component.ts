import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

@Component({
  selector: 'app-run-ksql',
  templateUrl: './run-ksql.component.html',
  styleUrls: ['./run-ksql.component.css'],
})
export class RunKsqlComponent implements OnInit {

  ksql: string;
  output: string | any[];
  connected: boolean;
  socket: Socket;
  error: string;

  showAsTable: boolean;

  constructor(private httpClient: HttpClient) {
    this.connected = false;
    this.ksql = 'SELECT * FROM users LIMIT 5;';
    this.showAsTable = false;
  }

  ngOnInit() {
  }

  runAsQuery(): void {
    this.disconnectSafe();

    this.output = '';
    this.socket = io('/');
    this.output = [];
    this.showAsTable = true;
    this.socket.on('result', (result: any) => {
      if (result.message) {
        this.error = result.message;
      } else if (result.errorMessage) {
        this.error = result.errorMessage.message;
      } else {
        (this.output as any[]).push(result.row.columns);
      }
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

  keys(object: any): string[] {
    return Object.keys(object);
  }

  async runAsStatement(): Promise<void> {
    this.error = '';
    this.output = '';
    this.showAsTable = false;
    const res = await this.httpClient.post('/ksql', {ksql: this.ksql}).toPromise();
    this.output = JSON.stringify(res, null, 4);
  }
}
