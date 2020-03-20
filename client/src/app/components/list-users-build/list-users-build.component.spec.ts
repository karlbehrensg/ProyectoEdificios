import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersBuildComponent } from './list-users-build.component';

describe('ListUsersBuildComponent', () => {
  let component: ListUsersBuildComponent;
  let fixture: ComponentFixture<ListUsersBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUsersBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
