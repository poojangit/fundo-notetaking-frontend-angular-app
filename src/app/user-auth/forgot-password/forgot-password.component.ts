import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    if(this.email) {
      console.log('Password reset requested for:', this.email);
      alert('If this email is registered,'+ this.email + 'a password reset link has been sent.');
      this.router.navigate(['/login']);
      
    } else {
      alert('Please enter a valid email address.');
    }
}

goToLogin() {
  this.router.navigate(['/login']); 
}
}