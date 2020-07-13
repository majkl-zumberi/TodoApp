import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRenderComponent } from './profile-render.component';

describe('ProfileRenderComponent', () => {
  let component: ProfileRenderComponent;
  let fixture: ComponentFixture<ProfileRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
