import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:7027/api/Login';
  private registerUrl = 'https://localhost:7027/api/Register';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post<any>(this.registerUrl, userData)
      .pipe(catchError(this.handleError));
  }

  login(userData: any) {
    return this.http.post<any>(this.loginUrl, userData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
