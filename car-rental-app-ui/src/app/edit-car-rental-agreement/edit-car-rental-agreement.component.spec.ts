import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarRentalAgreementComponent } from './edit-car-rental-agreement.component';

describe('EditCarRentalAgreementComponent', () => {
  let component: EditCarRentalAgreementComponent;
  let fixture: ComponentFixture<EditCarRentalAgreementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCarRentalAgreementComponent]
    });
    fixture = TestBed.createComponent(EditCarRentalAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
