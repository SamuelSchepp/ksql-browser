import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamsPageComponent } from './streams-page.component';

describe('StreamsPageComponent', () => {
  let component: StreamsPageComponent;
  let fixture: ComponentFixture<StreamsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
