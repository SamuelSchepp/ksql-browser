import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Stream {
  name: string;
  topic: string;
  format: string;
}

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  streams: Stream[];

  constructor(private httpClient: HttpClient) {
    this.streams = [];
  }

  ngOnInit() {
    setInterval(async () => {
      this.streams = await this.httpClient.get('/streams').toPromise() as Stream[];
    }, 1000);
  }
}
