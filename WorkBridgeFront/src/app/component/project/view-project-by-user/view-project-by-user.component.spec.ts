import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectByUserComponent } from './view-project-by-user.component';

describe('ViewProjectByUserComponent', () => {
  let component: ViewProjectByUserComponent;
  let fixture: ComponentFixture<ViewProjectByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectByUserComponent]
    });
    fixture = TestBed.createComponent(ViewProjectByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
