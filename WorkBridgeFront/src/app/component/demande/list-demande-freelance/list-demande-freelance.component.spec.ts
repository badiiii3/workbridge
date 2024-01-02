import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeFreelanceComponent } from './list-demande-freelance.component';

describe('ListDemandeFreelanceComponent', () => {
  let component: ListDemandeFreelanceComponent;
  let fixture: ComponentFixture<ListDemandeFreelanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandeFreelanceComponent]
    });
    fixture = TestBed.createComponent(ListDemandeFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
