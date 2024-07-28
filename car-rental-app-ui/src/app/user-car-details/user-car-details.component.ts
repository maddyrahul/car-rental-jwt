import { Component, OnInit } from '@angular/core';
import { CarDetails } from '../models/models';
import { AdminServiceService } from '../services/admin-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-car-details',
  templateUrl: './user-car-details.component.html',
  styleUrls: ['./user-car-details.component.css']
})
export class UserCarDetailsComponent  implements OnInit {

  cardetails:  CarDetails={
    vehicle_Id: 0,
    maker:'',
    model:'',
    rental_Price:0,
    availability_status:'',
    image_Link:''
  };
  constructor(
    private adminservice: AdminServiceService,
    
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void 
  {
    this.route.queryParams.subscribe(params=> {
      const id = +params['id'];
      if (!isNaN(id)) {
        // Check if userId is a valid number
        this.adminservice.getCarByCarId(id).subscribe(
          (data) => {
            this.cardetails=data;
          console.log(data)
          });
      } else {
        console.error('Invalid userId:', id);
      }
    });
  }
}