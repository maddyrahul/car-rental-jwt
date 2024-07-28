import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCarDetailsComponent } from './user-car-details.component';

describe('UserCarDetailsComponent', () => {
  let component: UserCarDetailsComponent;
  let fixture: ComponentFixture<UserCarDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCarDetailsComponent]
    });
    fixture = TestBed.createComponent(UserCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
