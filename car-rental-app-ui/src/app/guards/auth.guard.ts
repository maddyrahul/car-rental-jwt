import { Injectable } from '@angular/core';
import { UtilityService } from '../utilty.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private utilityService: UtilityService) { }
    canActivate(): boolean {
        if (this.utilityService.isLoggedIn() || this.utilityService.getRole()==='admin') {
            // User or admin is authenticated, allow access to the route
            return true;
        }

        // User is not authenticated, redirect to the login page
        this.router.navigate(['/home']);
        return false;
    }
}
