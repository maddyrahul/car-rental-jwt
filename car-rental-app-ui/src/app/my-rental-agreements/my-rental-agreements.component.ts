import { Component } from '@angular/core';
import { RentalAgreement, User } from '../models/models';
import { AdminServiceService } from '../services/admin-service.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utilty.service';

@Component({
  selector: 'app-my-rental-agreements',
  templateUrl: './my-rental-agreements.component.html',
  styleUrls: ['./my-rental-agreements.component.css']
})
export class MyRentalAgreementsComponent {
  sharedRes = 0;
  error = false;
  rentalAgreements: RentalAgreement[] = [];
  userId: number | null = null;

  xValue: number = 0;
  user: User[] = [];
  xValuesArray: { rentalAgreementId: number, xValue: number }[] = [];

  constructor(private adminservice: AdminServiceService, private router: Router, private utilityService: UtilityService) { }
  ngOnInit(): void {
 
    this.adminservice.getAllRentalcar().subscribe((data: RentalAgreement[]) => {
      // Filter the data based on userId
      this.rentalAgreements = data.filter(item => item.userId === this.utilityService.getUserId());
      console.log(this.rentalAgreements)
      // const xValuesArray = [];
      // Loop through rentalAgreements and log vehicle IDs
      for (let i = 0; i < this.rentalAgreements.length; i++) {
        const bookingDate = new Date(this.rentalAgreements[i].bookingDate).getTime();
        const returnDate = new Date(this.rentalAgreements[i].returnDate).getTime();
        const daysDifference = Math.ceil((returnDate - bookingDate) / (1000 * 3600 * 24));

        this.adminservice.getCarByCarId(this.rentalAgreements[i].vehicle_Id).subscribe((res) => {
          const xValue = daysDifference * res.rental_Price;

          // Create an object with vehicle_Id and xValue and push it into the array
          this.xValuesArray.push({ rentalAgreementId: this.rentalAgreements[i].rentalAgreementId, xValue: xValue });
           
        });
      }
    });
    console.log(this.xValuesArray)
  }

 




  editRentalAgreement(rentalAgreementId: number) {
    // Navigate to the EditCar route with the vehicle_Id as a query parameter
    this.router.navigate(['/edit-car-rental-agreement'], {
      queryParams: {
        id: rentalAgreementId,
      },
    });
  }

  deleteCarRental(rentalAgreementId: number) {
    this.adminservice.deleteCarRental(rentalAgreementId).subscribe(res => {
      // Remove the deleted agreement from the array
      this.rentalAgreements = this.rentalAgreements.filter(agreement => agreement.rentalAgreementId !== rentalAgreementId);

      // Recalculate this.xValue
      // this.calculateXValue();

      this.error = true;
    });
  }


  showcar(vehicle_Id: number) {
    this.router.navigate(['/user-car-details'], {
      queryParams: {
        id: vehicle_Id,
      },
    }); // Re
  }


  RequestForReturn(rentalAgreement: any): boolean {
    return rentalAgreement.requestForReturn === 'yes';
  }

  updateRequestForReturn(rentalAgreement: RentalAgreement): void {
    console.log(rentalAgreement.rentalAgreementId);
    this.adminservice.getRentalAgreementById(rentalAgreement.rentalAgreementId).subscribe(
      (res) => {
        res.requestForReturn = 'yes';

        // Update the rentalAgreement object in the rentalAgreements array
        const index = this.rentalAgreements.findIndex((agreement) => agreement.rentalAgreementId === res.rentalAgreementId);
        if (index !== -1) {
          this.rentalAgreements[index] = res;
        }

        this.adminservice.updateRentalAgreement(res).subscribe(() => {
          // Handle success or error
          console.log('Rental Agreement updated successfully');
        });
      }
    );
  }
}
