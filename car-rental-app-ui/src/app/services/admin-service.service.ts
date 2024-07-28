import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDetails, RentalAgreement, RentalAgreementDto, User } from '../models/models';
import { BehaviorSubject, Observable, Subject, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
 baseurl = 'https://localhost:7233/api/CarDetails/';
 public sharedRes: any | null = null;

 userdata:any="hii"
  constructor(private http: HttpClient) {}

  getAllcar():Observable<CarDetails[]>{
    return this.http.get<CarDetails[]>(this.baseurl+'GetAllCarDetails');
  }
  
  getAllRentalcar():Observable<RentalAgreement[]>{
    return this.http.get<RentalAgreement[]>(this.baseurl+'GetAllRentalAgreements');
  }
  
  getCarByCarId(id:number){
      return this.http.get<CarDetails>(this.baseurl+'GetCarDetailById/'+id);
  }
  
  getRentalAgreementById(id:number){
    return this.http.get<RentalAgreement>(this.baseurl+'GetRentalAgreementById/'+id);
}


  updateRentalAgreement(rentalAgreement: any): Observable<RentalAgreement> {
    return this.http.put<RentalAgreement>(`${this.baseurl}UpdateRentalAgreement/${rentalAgreement.rentalAgreementId}`, rentalAgreement);
  }


  
  getRentalAgreement(userId: number, vehicleId: number) {
    return this.http.get<RentalAgreement>(`${this.baseurl}CreateRentalAgreement/${userId}/${vehicleId}`);
  }

  addcar(car: CarDetails): Observable<CarDetails> {

    return this.http.post<CarDetails>(`${this.baseurl}AddCarDetails`, car);
  }




  deleteCar(vehicle_Id: number): Observable<CarDetails> {
    return this.http.delete<CarDetails>(`${this.baseurl}DeleteCarDetails/${vehicle_Id}`);
  }

  deleteCarRental(rentalAgreementId: number): Observable<RentalAgreement> {
    return this.http.delete<RentalAgreement>(`${this.baseurl}DeleteCarRentalDetails/${rentalAgreementId}`);
  }

  getRentalAgreementsByVehicleId(vehicleId: number): Observable<RentalAgreement[]> {
    return this.http.get<RentalAgreement[]>(`${this.baseurl}GetRentalAgreementsByVehicle_Id/${vehicleId}`);
  }

  updateCar(car: CarDetails): Observable<CarDetails> {
    return this.http.put<CarDetails>(`${this.baseurl}UpdateCarDetails/${car.vehicle_Id}`, car);
  }



 

getUserDetailsById(id:number){
    return this.http.get<User>('https://localhost:7233/api/User/GetUserDetailById/'+id);
}
  

  createRentalAgreement(rentalAgreement: RentalAgreementDto): Observable<RentalAgreementDto> {
    return this.http.post<RentalAgreementDto>(`${this.baseurl}CreateAgreement`, rentalAgreement);
  }



  
  public sharedDataSubject = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedDataSubject.asObservable();

  setSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }

  private userDataSubject = new Subject<any>();

  // Observable to subscribe to in the HomeComponent
  userData$ = this.userDataSubject.asObservable();

  // Function to set the data in the service
  setUserData(data: any) {
    this.userDataSubject.next(data);
  }
}
