import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectFreelanceComponent } from './view-project-freelance.component';

describe('ViewProjectFreelanceComponent', () => {
  let component: ViewProjectFreelanceComponent;
  let fixture: ComponentFixture<ViewProjectFreelanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectFreelanceComponent]
    });
    fixture = TestBed.createComponent(ViewProjectFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
