import {Component, OnInit, ViewChild} from '@angular/core';
import {TopicComponent} from '../topic/topic.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {
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
