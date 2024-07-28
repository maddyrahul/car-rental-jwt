import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { Router } from '@angular/router';
import { RentalAgreement, User } from '../models/models';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';

@Component({
  selector: 'app-list-rent-car',
  templateUrl: './list-rent-car.component.html',
  styleUrls: ['./list-rent-car.component.css']
})
export class ListRentCarComponent implements OnInit {
  rentalAgreements: any[]=[];
  error=false;
  listRent: RentalAgreement[] = []; // Updated variable name 'listRent'
  user: User[]=[]; 
  constructor(private adminservice: AdminServiceService, private router: Router) { }
  
  ngOnInit(): void {
    this.getRentList(); // Updated method name 'getRentList'
  }

 
  getRentList() {
    this.adminservice.getAllRentalcar().subscribe((res: RentalAgreement[]) => { // Updated method name 'getAllRentalCar'
      this.listRent = res; // Assign the response to 'listRent'

      console.log(this.listRent)
    });
  }

  editRentalAgreement(rentalAgreementId: number) {
    // Navigate to the EditCar route with the vehicle_Id as a query parameter
    this.router.navigate(['/edit-car-rental-agreement'], {
      queryParams: {
        id: rentalAgreementId,
      },
    });
  }

  deleteCarRental(rentalAgreementId:number){
    this.adminservice.deleteCarRental(rentalAgreementId).subscribe(res=>{
      this.error=true;
      this.getRentList();
    })
  }

  showuser(userId:number){
    this.router.navigate(['/user-details-modal'], {
      queryParams: {
        id: userId,
      },
    }); // Re
  }

  IsReturn(rentalAgreement: any): boolean {
    return rentalAgreement.isReturned === 'yes';
  }
  RequestForReturn(rentalAgreement: any): boolean {
    return rentalAgreement.requestForReturn === 'yes';
  }
  
  updateIsReturn(rentalAgreement: RentalAgreement): void {
    console.log(rentalAgreement.rentalAgreementId);
    this.adminservice.getRentalAgreementById(rentalAgreement.rentalAgreementId).subscribe(
      (res) => {
        res.isReturned = 'yes';
console.log("response",res);
        // Update the rentalAgreement object in the rentalAgreements array
        const index = this.rentalAgreements.findIndex((agreement) => agreement.rentalAgreementId === res.rentalAgreementId);
        if (index !== -1) {
          this.rentalAgreements[index] = res;
        }
        
        this.adminservice.updateRentalAgreement(res).subscribe(() => {
          // Handle success or error
          

          this.getRentList();
          console.log('Rental Agreement updated successfully');
        });
      }
    );
  }
}
