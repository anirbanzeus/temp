import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalTaskComponent } from './app-modal-task.component';

describe('AppModalTaskComponent', () => {
  let component: AppModalTaskComponent;
  let fixture: ComponentFixture<AppModalTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppModalTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppModalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
