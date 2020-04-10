import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertVisitComponent } from './alert-visit.component';

describe('AlertVisitComponent', () => {
  let component: AlertVisitComponent;
  let fixture: ComponentFixture<AlertVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
