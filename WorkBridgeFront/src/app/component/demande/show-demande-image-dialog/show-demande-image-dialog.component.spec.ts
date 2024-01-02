import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDemandeImageDialogComponent } from './show-demande-image-dialog.component';

describe('ShowDemandeImageDialogComponent', () => {
  let component: ShowDemandeImageDialogComponent;
  let fixture: ComponentFixture<ShowDemandeImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDemandeImageDialogComponent]
    });
    fixture = TestBed.createComponent(ShowDemandeImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
