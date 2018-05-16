import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  topics: any[];
  displayData: any[];
  loading: boolean;

  constructor(private httpClient: HttpClient) {
    this.loading = false;
    this.topics = [];
    this.displayData = [];
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.topics = await this.httpClient.get('/topics').toPromise() as any[];
    this.loading = false;
  }

  keys(target: any): string[] {
    return Object.keys(target);
  }

  async display(topic: string): Promise<void> {
    this.loading = true;
    this.displayData = [];
    this.displayData = await this.httpClient.get('/topic/' + topic).toPromise() as any[];
    this.loading = false;
  }
}
