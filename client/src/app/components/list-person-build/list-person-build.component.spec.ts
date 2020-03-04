import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonBuildComponent } from './list-person-build.component';

describe('ListPersonBuildComponent', () => {
  let component: ListPersonBuildComponent;
  let fixture: ComponentFixture<ListPersonBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
