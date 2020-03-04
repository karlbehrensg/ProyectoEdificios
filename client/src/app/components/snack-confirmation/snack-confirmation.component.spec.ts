import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackConfirmationComponent } from './snack-confirmation.component';

describe('SnackConfirmationComponent', () => {
  let component: SnackConfirmationComponent;
  let fixture: ComponentFixture<SnackConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
