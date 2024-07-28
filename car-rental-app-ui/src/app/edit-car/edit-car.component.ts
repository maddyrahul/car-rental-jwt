import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CarDetails } from '../models/models';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  car: CarDetails = {
    vehicle_Id: 0,
    maker: '',
    model: '',
    rental_Price: 0,
    availability_status: '',
    image_Link: ''
  };
  successMessage = ''
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private navigationService: AdminServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id))
      {
        this.navigationService.getCarByCarId(id).subscribe((data) => {
          this.car = data;
        });
      } else {
      // You might want to display an error message or redirect the user.
      console.error('Error car details:');
       
    }
    });
  }
  updateCar() {
    this.navigationService.updateCar(this.car).subscribe(
      () => {
        console.log('Car details updated successfully.');
        this.successMessage = 'Successfully Updated !!'
        setTimeout(() => {
          this.successMessage = '';
          // Redirect to the car details page
          this.router.navigate(['/car-details']);
        }, 3000);
      },
      (error) => {
        console.error('Error updating car details:', error);
        }
    );
  }
}
