import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private apiUrl = 'https://localhost:7233/api/User/';
  private readonly USER_ID_KEY = 'user_id';
  private userId: number = 0;
  private role: string = '';

  constructor(private http: HttpClient) {
    const storedUserId = localStorage.getItem(this.USER_ID_KEY);
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    }
  }

  setUserId(userId: number): void {
    this.userId = userId;
    localStorage.setItem(this.USER_ID_KEY, userId.toString());
  }

  getUserId(): number {
    return this.userId;
  }

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return this.role;
  }

  clearUserId(): void {
    this.userId = 0;
    localStorage.removeItem(this.USER_ID_KEY);
  }

  Userlogin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}LoginUser`, { email, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  logout(): void {
    this.clearUserId();
    localStorage.removeItem('jwtToken');
  }

  public decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  }


 

  isAdmin(): boolean {
    const userRole = this.getRole();
    return userRole === 'admin'; // Adjust according to your actual role structure
  }

  isUser(): boolean {
    const userRole = this.getRole();
    return userRole === 'user'; // Adjust according to your actual role structure
  }


  
}
