import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { AddcarComponent } from './addcar/addcar.component';
import { RentalAgreementComponent } from './rental-agreement/rental-agreement.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { ListRentCarComponent } from './list-rent-car/list-rent-car.component';
import { EditCarRentalAgreementComponent } from './edit-car-rental-agreement/edit-car-rental-agreement.component';

import { UserDetailsModalComponent } from './user-details-modal/user-details-modal.component';
import { MyRentalAgreementsComponent } from './my-rental-agreements/my-rental-agreements.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

import { UserCarDetailsComponent } from './user-car-details/user-car-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path:'user-car-details',component:UserCarDetailsComponent},
  {path:'login',component:LoginComponent},
  { path: 'car-details', component: CarDetailsComponent ,canActivate:[AuthGuard] },
  {path:'addcar',component:AddcarComponent },
  { path: 'rental-agreement/:userId/:vehicleId', component: RentalAgreementComponent,canActivate:[AuthGuard]  },
  {path:'edit-car',component:EditCarComponent,canActivate:[AuthGuard] },
  {path:'list-rent-car',component:ListRentCarComponent,canActivate:[AuthGuard] },
  {path:'edit-car-rental-agreement',component:EditCarRentalAgreementComponent,canActivate:[AuthGuard] },
  {path:'user-details-modal',component:UserDetailsModalComponent,canActivate:[AuthGuard] },
  {path:'my-rental-agreements',component:MyRentalAgreementsComponent,canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
