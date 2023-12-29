import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeClientComponent } from './list-demande-client.component';

describe('ListDemandeClientComponent', () => {
  let component: ListDemandeClientComponent;
  let fixture: ComponentFixture<ListDemandeClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDemandeClientComponent]
    });
    fixture = TestBed.createComponent(ListDemandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
