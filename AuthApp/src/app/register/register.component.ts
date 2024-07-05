import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = { username: '', email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.register(this.registerData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.errorMessage = 'Unable to reach the server. Please check your network connection.';
        } else if (error.status === 401) {
          this.errorMessage = 'Unauthorized: Incorrect credentials.';
        } else {
          this.errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }
    );
  }
}
