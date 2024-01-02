import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImagesDialogComponent } from './show-images-dialog.component';

describe('ShowImagesDialogComponent', () => {
  let component: ShowImagesDialogComponent;
  let fixture: ComponentFixture<ShowImagesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowImagesDialogComponent]
    });
    fixture = TestBed.createComponent(ShowImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
