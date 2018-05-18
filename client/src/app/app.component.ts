import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  status: string;
  selectedTopic: string;

  constructor(private httpClient: HttpClient) {
    this.status = '';
    this.selectedTopic = '';
  }

  async ngOnInit(): Promise<void> {

  }

  topicSelected(topicName: string): void {
    this.selectedTopic = topicName;
  }
}
