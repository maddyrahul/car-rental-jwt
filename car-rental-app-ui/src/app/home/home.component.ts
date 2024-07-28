import { Component, OnInit , AfterViewInit} from '@angular/core';
import { CarDetails } from '../models/models';
import { AdminServiceService } from '../services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../utilty.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AdminServiceService],
  template: `
    <button (click)="reloadPage()">Reload Page Once</button>
  `,
})
export class HomeComponent implements OnInit , AfterViewInit{
  error = false;
  reloading = false;
  sharedRes = 0;
  searchText: string = '';
  cars: CarDetails[] = [];
  filteredCars: CarDetails[] = [];

  constructor(
    public adminService: AdminServiceService,
    public router: Router,
    public utilityService: UtilityService,
    private route: ActivatedRoute // Inject ActivatedRoute to access query parameters
  ) {
  }

  ngOnInit() {
    this.getAllcar();
    
  }

  ngAfterViewInit() {
  
    // const storedSharedRes = localStorage.getItem('sharedRes');
    // if (storedSharedRes) {
    //   this.sharedRes = parseInt(storedSharedRes, 10); // Parse the stored value as an integer
      
      
    // }
    console.log("userId", this.utilityService.getUserId());
   
    this.sharedRes=this.utilityService.getUserId();
   
  }
 
  

  getAllcar() {
    
    this.adminService.getAllcar().subscribe(
      res => {
        
        this.cars = res;
        this.filteredCars = [...this.cars];
        console.log(res);
      },
      error => {
        console.error('Error fetching car details: ', error);
      }
    );
  

  }

  search(value: string) {
    value = value.toLowerCase();
    if (value.length > 0) {
      this.filteredCars = this.cars.filter(car =>
        car.maker.toLowerCase().includes(value) ||
        car.model.toLowerCase().includes(value) ||
        car.rental_Price.toString().includes(value)
      );
    } else {
      this.filteredCars = [...this.cars];
    }
  }


}
