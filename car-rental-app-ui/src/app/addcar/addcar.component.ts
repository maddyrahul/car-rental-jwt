import { Component, OnInit } from '@angular/core';
import { CarDetails } from '../models/models';
import { Router } from '@angular/router'; // Change this line
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {
  
  car: CarDetails = {
    vehicle_Id: 0,
    maker: '',
    model: '',
    rental_Price: 0,
    availability_status: '',
    image_Link: ''

  }
  constructor(private adminService: AdminServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if (params['car']) {
        this.car = JSON.parse(params['car']);
      }
    });
  }

  onSubmit() {
    if (this.car.vehicle_Id == 0) {
      this.adminService.addcar(this.car).subscribe(res => {
        console.log(res);
        this.adminService.getAllcar().subscribe(cars => {
          this.car = {
            vehicle_Id: 0,
            maker: '',
            model: '',
            rental_Price: 0,
            availability_status: '',
            image_Link: ''
          };
      
          this.router.navigate(['/car-details']);
          
        });
      });
    }
    else {
      this.updateCar(this.car);
      this.router.navigate(['/car-details']);
    }

  }
  updateCar(car: CarDetails) {
    this.adminService.updateCar(car).subscribe(res => {
      this.adminService.getAllcar();
    });
  }

}
