import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunKsqlComponent } from './run-ksql.component';

describe('RunKsqlComponent', () => {
  let component: RunKsqlComponent;
  let fixture: ComponentFixture<RunKsqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunKsqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunKsqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
