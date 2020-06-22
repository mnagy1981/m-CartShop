import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhotoProductComponent } from './edit-photo-product.component';

describe('EditPhotoProductComponent', () => {
  let component: EditPhotoProductComponent;
  let fixture: ComponentFixture<EditPhotoProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhotoProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhotoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
