import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostToTopicComponent } from './post-to-topic.component';

describe('PostToTopicComponent', () => {
  let component: PostToTopicComponent;
  let fixture: ComponentFixture<PostToTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostToTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostToTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
