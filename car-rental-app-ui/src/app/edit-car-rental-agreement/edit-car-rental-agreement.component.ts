import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminServiceService } from '../services/admin-service.service';
import { RentalAgreement } from '../models/models';
import { UtilityService } from '../utilty.service';

@Component({
  selector: 'app-edit-car-rental-agreement',
  templateUrl: './edit-car-rental-agreement.component.html',
  styleUrls: ['./edit-car-rental-agreement.component.css']
})
export class EditCarRentalAgreementComponent implements OnInit{
  car: RentalAgreement = {
    rentalAgreementId: 0, // Provide the actual rentalAgreementId if available
    userId: 0, // Provide the actual userId
    carDetails: {
      // Fill in carDetails based on the CarDetails interface
      vehicle_Id: 0, // Provide the actual vehicle_Id
      maker: '', // Provide the car maker
      model: '', // Provide the car model
      rental_Price: 0, // Provide the rental price
      availability_status: '', // Provide the availability status
      image_Link: '', // Provide the image link
    },
    vehicle_Id: 0, // Provide the actual vehicle_Id
    user: {
      // Fill in user based on the User interface
      userId: 0, // Provide the actual userId
      email: '', // Provide the user's email
      password: '', // Provide the user's password
     name:'',
      phoneNumber: '',
      address: '',
      role: ''
    },
    bookingDate: '', // Provide the booking date
    returnDate: '', // Provide the return date
    isReturned: '', // Provide the isReturned status
    requestForReturn: '', // Provide the requestForReturn status
  };
  successMessage = ''
  constructor(private route: ActivatedRoute, public utilityService:UtilityService,
    private router: Router,
    private navigationService: AdminServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id))
      {
        this.navigationService.getRentalAgreementById(id).subscribe((data) => {
          this.car = data;
        });
      } else {
      // You might want to display an error message or redirect the user.
      console.error('Error car details:');
       
    }
    });
  }

  updaterentalCar() {
    this.navigationService.updateRentalAgreement(this.car).subscribe(
      () => {
        console.log('Car Rental details updated successfully.');
        this.successMessage = 'Successfully Updated !!'
        setTimeout(() => {
          this.successMessage = '';
          // Redirect to the car details page
          if(this.utilityService.isLoggedIn()){
            this.router.navigate(['/my-rental-agreements']);
          }
          else if (this.utilityService.getRole()==='admin'){
            this.router.navigate(['/list-rent-car']);
          }
          
        }, 1000);
      },
      (error) => {
        console.error('Error updating car details:', error);
        }
    );
  }

}
