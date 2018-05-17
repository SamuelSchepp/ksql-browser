import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  topics: any[];
  selectedTopic: string;
  displayData: any[];
  status: string;

  postToTopicInput: string;

  constructor(private httpClient: HttpClient) {
    this.selectedTopic = '';
    this.topics = [];
    this.displayData = [];
    this.status = '';

    this.postToTopicInput = '{"registertime":123,"gender":"MALE","regionid":"THM","userid":"SAMUEL"}\n';
  }

  async ngOnInit(): Promise<void> {
    this.topics = await this.httpClient.get('/topics').toPromise() as any[];
    this.status = 'topics loaded';

    setInterval(() => {
      if (this.selectedTopic.length > 0) {
        this.display(this.selectedTopic);
      }
    }, 1000);
  }

  keys(target: any): string[] {
    return Object.keys(target);
  }

  async display(topic: string): Promise<void> {
    this.displayData = await this.httpClient.get('/topic/' + topic).toPromise() as any[];
    this.selectedTopic = topic;
    this.status = 'data displayed';
  }

  async postToTopic(): Promise<void> {
    try {
      const data = JSON.parse(this.postToTopicInput);
      const result = await this.httpClient.post('/topic/' + this.selectedTopic, data).toPromise();
      this.status = 'okay: ' + JSON.stringify(result);
    } catch (err) {
      console.error(err);
      this.status = JSON.stringify(err);
    }
  }
}
