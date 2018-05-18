import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit, OnDestroy {
  topics: {[topic: string]: number};

  @Output() topicSelected = new EventEmitter<string>();

  private timer: number;

  constructor(private httpClient: HttpClient) {
    this.topics = {};
  }

  ngOnInit() {
    this.timer = setInterval(async () => {
      this.topics = await this.httpClient.get('/topics').toPromise() as {[topic: string]: number};
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  get topicList(): string[] {
    return Object.keys(this.topics);
  }
}
