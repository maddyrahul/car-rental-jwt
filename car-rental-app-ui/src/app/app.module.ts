import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component'; 
import { CarDetailsComponent } from './car-details/car-details.component';
import { AddcarComponent } from './addcar/addcar.component';
import { LoginComponent } from './login/login.component';

import { RentalAgreementComponent } from './rental-agreement/rental-agreement.component';

import { JwtModule } from '@auth0/angular-jwt';
import { EditCarComponent } from './edit-car/edit-car.component';
import { ListRentCarComponent } from './list-rent-car/list-rent-car.component';
import { EditCarRentalAgreementComponent } from './edit-car-rental-agreement/edit-car-rental-agreement.component';
import { UserDetailsModalComponent } from './user-details-modal/user-details-modal.component';
import { MyRentalAgreementsComponent } from './my-rental-agreements/my-rental-agreements.component';
import { UserCarDetailsComponent } from './user-car-details/user-car-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
     
    CarDetailsComponent,
    AddcarComponent,
    LoginComponent,

    RentalAgreementComponent,
    EditCarComponent,
    ListRentCarComponent,
    EditCarRentalAgreementComponent,
    UserDetailsModalComponent,
    MyRentalAgreementsComponent,
    UserCarDetailsComponent,
    
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
