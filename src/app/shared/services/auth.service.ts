// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

/*   login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/signin`, { email, password }).pipe(
      tap(response => {
        console.log('respuesta', response.data.token);
        
        localStorage.setItem('token', response.data.token);
      })
    );
  }
 */

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`http://10.1.140.21:8082/api/auth/login`, { username, password }).pipe(
      tap(response => {
        
        const token = response.token;
        console.log(token);
       localStorage.setItem('token', token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
