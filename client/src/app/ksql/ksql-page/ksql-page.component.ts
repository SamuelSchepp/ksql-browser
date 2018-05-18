import {Component, OnInit, ViewChild} from '@angular/core';
import {DescribeComponent} from '../describe/describe.component';

@Component({
  selector: 'app-ksql-page',
  templateUrl: './ksql-page.component.html',
  styleUrls: ['./ksql-page.component.css']
})
export class KsqlPageComponent implements OnInit {

  @ViewChild(DescribeComponent) describeComponent: DescribeComponent;

  constructor() { }

  ngOnInit() {
  }

}
