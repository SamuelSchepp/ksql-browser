import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-post-to-topic',
  templateUrl: './post-to-topic.component.html',
  styleUrls: ['./post-to-topic.component.css']
})
export class PostToTopicComponent implements OnInit {

  postToTopicInput: string;
  postToTopicTopic: string;

  constructor(private httpClient: HttpClient) {
    this.postToTopicInput = '{"registertime":123,"gender":"MALE","regionid":"THM","userid":"SAMUEL"}\n';
    this.postToTopicTopic = 'users';
  }

  ngOnInit() {
  }

  async postToTopic(): Promise<void> {
    try {
      const data = JSON.parse(this.postToTopicInput);
      const result = await this.httpClient.post('/topic/' + this.postToTopicTopic, data).toPromise();
      console.log(`okay: ${JSON.stringify(result)}`);
    } catch (err) {
      console.error(err);
    }
  }

}
