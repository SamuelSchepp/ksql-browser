import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  topicName: string;

  constructor(private httpClient: HttpClient) {
    this.topicName = '';
  }

  ngOnInit() {
  }

  async createTopic(): Promise<void> {
    try {
      const result = await this.httpClient.post('/topic', {topic: this.topicName}).toPromise();
      console.log(`okay: ${JSON.stringify(result)}`);
    } catch (err) {
      console.error(err);
    }
  }
}
