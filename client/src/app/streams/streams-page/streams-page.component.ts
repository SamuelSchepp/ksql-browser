import {Component, OnInit, ViewChild} from '@angular/core';
import {DescribeComponent} from '../../common/describe/describe.component';

@Component({
  selector: 'app-streams-page',
  templateUrl: './streams-page.component.html',
  styleUrls: ['./streams-page.component.css']
})
export class StreamsPageComponent implements OnInit {
  @ViewChild(DescribeComponent) describeComponent: DescribeComponent;
  constructor() { }

  ngOnInit() {
  }

}
