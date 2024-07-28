import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRentalAgreementsComponent } from './my-rental-agreements.component';

describe('MyRentalAgreementsComponent', () => {
  let component: MyRentalAgreementsComponent;
  let fixture: ComponentFixture<MyRentalAgreementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRentalAgreementsComponent]
    });
    fixture = TestBed.createComponent(MyRentalAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
