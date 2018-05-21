import {Component, OnInit, ViewChild} from '@angular/core';
import {DescribeComponent} from '../../common/describe/describe.component';
import {RunKsqlComponent} from '../../ksql/run-ksql/run-ksql.component';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css']
})
export class TablesPageComponent implements OnInit {

  @ViewChild(DescribeComponent) describeComponent: DescribeComponent;
  @ViewChild(RunKsqlComponent) ksql: RunKsqlComponent;

  constructor() { }

  ngOnInit() {
  }

  runKSQL(ksql: string): void {
    this.ksql.ksql = ksql;
    this.ksql.runAsQuery();
  }

}
