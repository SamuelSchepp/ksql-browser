import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KsqlPageComponent } from './ksql-page.component';

describe('KsqlPageComponent', () => {
  let component: KsqlPageComponent;
  let fixture: ComponentFixture<KsqlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KsqlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KsqlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
