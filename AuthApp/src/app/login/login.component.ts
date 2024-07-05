import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        const decodedToken = this.decodeToken(response.token);
        const username = decodedToken.unique_name; // Assuming your token has a 'unique_name' claim
        alert(`Welcome ${username}`);
        this.router.navigate(['/']); // Navigate to home or desired route after successful login
      },
      (errorResponse: any) => {
        if (errorResponse && errorResponse.error && errorResponse.error.message) {
          this.errorMessage = errorResponse.error.message;
        } else {
          this.errorMessage = 'User is not registered !';
        }
        // Display error message in an alert box for testing
      }
    );
  }

  // Helper function to decode JWT token (assuming it's a JWT)
  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
