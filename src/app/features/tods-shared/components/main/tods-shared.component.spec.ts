import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodsSharedComponent } from './tods-shared.component';

describe('TodsSharedComponent', () => {
  let component: TodsSharedComponent;
  let fixture: ComponentFixture<TodsSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodsSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
