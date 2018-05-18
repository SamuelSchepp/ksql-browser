import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy {
  displayData: any[];

  private timer: number;

  @Input() selectedTopic: string;

  constructor(private httpClient: HttpClient) {
    this.selectedTopic = '';
    this.displayData = [];
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      if (this.selectedTopic.length > 0) {
        this.display(this.selectedTopic);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  async display(topic: string): Promise<void> {
    try {
      this.displayData = await this.httpClient.get('/topic/' + topic).toPromise() as any[];
    } catch (err) {
      console.log(`error: ${err}`);
      this.displayData = [];
    }
    this.selectedTopic = topic;
  }

  clear(): void {
    this.displayData = [];
  }

  keys(target: any): string[] {
    return Object.keys(target);
  }
}
