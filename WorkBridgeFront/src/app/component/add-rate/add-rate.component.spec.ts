import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRateComponent } from './add-rate.component';

describe('AddRateComponent', () => {
  let component: AddRateComponent;
  let fixture: ComponentFixture<AddRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRateComponent]
    });
    fixture = TestBed.createComponent(AddRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
