import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { User } from '../models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css']
})
export class UserDetailsModalComponent implements OnInit {
  user: User = {
    userId: 0,
    name: '', 
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role:''
  };

  constructor(
    private adminservice: AdminServiceService,
    
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=> {
      const id = +params['id'];
      if (!isNaN(id)) {
        // Check if userId is a valid number
        this.adminservice.getUserDetailsById(id).subscribe(
          (data) => {
            this.user=data; // Assign the fetched user to the 'user' property
            console.log("user", this.user);
          });
      } else {
        console.error('Invalid userId:', id);
      }
    });
  }
}
