import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../services/admin-service.service';
import { CarDetails, RentalAgreement, RentalAgreementDto } from '../models/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from '../utilty.service';

@Component({
  selector: 'app-rental-agreement',
  templateUrl: './rental-agreement.component.html',
  styleUrls: ['./rental-agreement.component.css'],
})
export class RentalAgreementComponent implements OnInit {
  carDetails: CarDetails = {
    vehicle_Id: 0,
    maker: '',
    model: '',
    rental_Price: 0,
    availability_status: '',
    image_Link: ''

  };

  rentalAgreement: RentalAgreementDto = {
    rentalAgreementId: 0,
    userId: 0,
    vehicle_Id: 0,

    bookingDate: new Date().toISOString().split('T')[0], // Initialize with the current date
    returnDate: new Date().toISOString().split('T')[0], // Initialize with the current date
    isReturned: 'no',
    requestForReturn: 'no'
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSlotAvailable: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public utilityService: UtilityService,
    private navigationService: AdminServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = +params['userId'];
      const vehicleId = +params['vehicleId'];
      this.rentalAgreement.userId = userId;
      this.rentalAgreement.vehicle_Id = vehicleId;
    });
    this.navigationService.getCarByCarId(this.rentalAgreement.vehicle_Id).subscribe((res) => {
      console.log(res);
      this.carDetails = res;
    });


  }



  createRentalAgreement(): void {
    const userBookingStart1 = new Date(this.rentalAgreement.bookingDate);
    const userBookingEnd1 = new Date(this.rentalAgreement.returnDate);

    const currentDate = new Date();

    // Check if bookingDate or returnDate is in the past
    if (userBookingStart1 < currentDate || userBookingEnd1 < currentDate) {
      this.errorMessage = 'Booking and return dates cannot be in the past.';
      return;
    }
    this.checkDate();
    if (this.isSlotAvailable) {
      this.navigationService.createRentalAgreement(this.rentalAgreement)
        .subscribe(
          (response: RentalAgreementDto) => {
            console.log('Rental agreement created:', response);
            this.successMessage = 'Successfully added rental agreement.';
            this.router.navigate(['/my-rental-agreements']);

          },
          (error) => {
            console.error('Error creating rental agreement:', error);
          }
        );
    }
  }
  checkDate() {
    this.navigationService.getRentalAgreementsByVehicleId(this.rentalAgreement.vehicle_Id).subscribe((data) => {
      const userBookingStart = new Date(this.rentalAgreement.bookingDate);
      const userBookingEnd = new Date(this.rentalAgreement.returnDate);
      let isSlot = true;

      for (let i = 0; i < data.length; i++) {
        const agreement = data[i];
        const existingBookingStart = new Date(agreement.bookingDate);
        const existingBookingEnd = new Date(agreement.returnDate);

        if (
          userBookingStart <= existingBookingEnd &&
          userBookingEnd >= existingBookingStart
        ) {
          isSlot = false;
          break;
        }
      }

      if (isSlot) {
        console.log("Slot is available");
        this.isSlotAvailable = isSlot;
        this.errorMessage = null;
        this.successMessage = "Slot is available";
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      } else {
        console.log("Slot is not available");
        this.errorMessage = "Slot is not available";

      }
    });
  }
}



