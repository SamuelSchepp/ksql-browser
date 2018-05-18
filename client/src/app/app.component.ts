import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TopicComponent} from './topic/topic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  status: string;
  selectedTopic: string;

  @ViewChild(TopicComponent) topic: TopicComponent;

  constructor(private httpClient: HttpClient) {
    this.status = '';
    this.selectedTopic = '';
  }

  async ngOnInit(): Promise<void> {

  }

  topicSelected(topicName: string): void {
    this.topic.clear();
    this.selectedTopic = topicName;
  }
}
