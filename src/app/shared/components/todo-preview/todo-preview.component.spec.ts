import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPreviewComponent } from './todo-preview.component';

describe('TodoPreviewComponent', () => {
  let component: TodoPreviewComponent;
  let fixture: ComponentFixture<TodoPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
