import { Component } from '@angular/core';

import { UtilityService } from '../utilty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(public utilityService: UtilityService, public router: Router) { }
 
 
  logoutUser() {
    console.log('Logout button clicked');
    this.utilityService.logout();
    this.router.navigate(['/home']);
  }
  
}
