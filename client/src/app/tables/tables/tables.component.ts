import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Table {
  name: string;
  topic: string;
  format: string;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {
  tables: Table[];

  private timer: number;
  @Output() describe: EventEmitter<string> = new EventEmitter<string>();
  @Output() ksql: EventEmitter<string> = new EventEmitter<string>();

  constructor(private httpClient: HttpClient) {
    this.tables = [];
  }

  ngOnInit() {
    this.timer = setInterval(async () => {
      this.tables = await this.httpClient.get('/tables').toPromise() as Table[];
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
