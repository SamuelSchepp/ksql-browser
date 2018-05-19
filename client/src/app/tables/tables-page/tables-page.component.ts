import {Component, OnInit, ViewChild} from '@angular/core';
import {DescribeComponent} from '../../common/describe/describe.component';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.css']
})
export class TablesPageComponent implements OnInit {

  @ViewChild(DescribeComponent) describeComponent: DescribeComponent;

  constructor() { }

  ngOnInit() {
  }

}
