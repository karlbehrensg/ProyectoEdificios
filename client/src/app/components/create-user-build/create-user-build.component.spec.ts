import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserBuildComponent } from './create-user-build.component';

describe('CreateUserBuildComponent', () => {
  let component: CreateUserBuildComponent;
  let fixture: ComponentFixture<CreateUserBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
