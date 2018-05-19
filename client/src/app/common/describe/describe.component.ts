import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.css']
})
export class DescribeComponent implements OnInit {

  data: any;

  constructor(private httpClient: HttpClient) {
    this.data = {};
  }

  async describe(name: string): Promise<void> {
    this.data = await this.httpClient.get(`/describe/${name}`).toPromise();
  }

  ngOnInit() {
  }

  get keyValues(): [string, string][] {
    if (!this.data['description']) {
      return [];
    }

    return Object.keys(this.data['description'])
      .filter((key) => {
        return typeof this.data['description'][key] === 'string' ||
          typeof this.data['description'][key] === 'number';
      })
      .map((key) => {
      return [key, this.data['description'][key]] as [string, string];
    });
  }

  get table(): any[] {
    return this.data['description']['schema'];
  }
}
