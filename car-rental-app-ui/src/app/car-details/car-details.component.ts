import { Component, OnInit } from '@angular/core';
import { CarDetails, RentalAgreement, User } from '../models/models';
import { Router } from '@angular/router'; // Change this line
import { AdminServiceService } from '../services/admin-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { UtilityService } from '../utilty.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit  {
  error=false;
 
  showRentalAgreement = false;
  title = 'car';
  cars: CarDetails[] = [];
  constructor(private adminService: AdminServiceService,private router: Router,public utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getAllcar();
    
  }
  getAllcar() {
    this.adminService.getAllcar().subscribe(
      res => {
        this.cars = res;
        
        console.log(res);
      }
    );
  }

  deleteCar(vehicle_Id:number){
    this.adminService.deleteCar(vehicle_Id).subscribe(res=>{
      this.error=true;
      this.getAllcar();
    })
  }


  editCar(vehicle_Id: number) {
    // Navigate to the EditCar route with the vehicle_Id as a query parameter
    this.router.navigate(['/edit-car'], {
      queryParams: {
        id: vehicle_Id,
      },
    });
  }
}


