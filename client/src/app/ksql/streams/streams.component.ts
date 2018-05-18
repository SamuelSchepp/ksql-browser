import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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
export class StreamsComponent implements OnInit, OnDestroy {
  streams: Stream[];

  private timer: number;
  @Output() describe: EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
    this.streams = [];
  }

  ngOnInit() {
    this.timer = setInterval(async () => {
      this.streams = await this.httpClient.get('/streams').toPromise() as Stream[];
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
