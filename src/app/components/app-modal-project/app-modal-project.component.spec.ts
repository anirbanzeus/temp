import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalProjectComponent } from './app-modal-project.component';

describe('AppModalProjectComponent', () => {
  let component: AppModalProjectComponent;
  let fixture: ComponentFixture<AppModalProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppModalProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppModalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
