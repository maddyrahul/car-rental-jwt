import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentCarComponent } from './list-rent-car.component';

describe('ListRentCarComponent', () => {
  let component: ListRentCarComponent;
  let fixture: ComponentFixture<ListRentCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRentCarComponent]
    });
    fixture = TestBed.createComponent(ListRentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
