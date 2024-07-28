import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UtilityService } from '../utilty.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';

  constructor(
    private fb: FormBuilder,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.pwd;

    this.utilityService.Userlogin(email, password).subscribe(
      response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
          const decodedToken = this.utilityService.decodeToken(token);
          const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          this.utilityService.setUserId(userId);
          this.utilityService.setRole(userRole);
          if(this.utilityService.isAdmin()){
            this.router.navigate(['/car-details']);
            
          }
          this.router.navigate(['/home']);
         
        }
      },
      error => {
        if (error.status === 401) {
          this.message = 'Invalid email or password.';
        } else {
          this.message = 'An error occurred. Please try again later.';
        }
      }
    );
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
