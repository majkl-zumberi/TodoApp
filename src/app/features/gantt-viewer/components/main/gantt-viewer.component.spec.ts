import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttViewerComponent } from './gantt-viewer.component';

describe('GanttViewerComponent', () => {
  let component: GanttViewerComponent;
  let fixture: ComponentFixture<GanttViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
