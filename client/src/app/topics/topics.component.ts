import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics: {[topic: string]: number};

  @Output() topicSelected = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
    this.topics = {};
  }

  ngOnInit() {
    setInterval(async () => {
      this.topics = await this.httpClient.get('/topics').toPromise() as {[topic: string]: number};
    }, 1000);
  }

  get topicList(): string[] {
    return Object.keys(this.topics);
  }
}
