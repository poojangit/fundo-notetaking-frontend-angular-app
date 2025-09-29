import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'; // ⬅️ New import for UserService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // 🗑️ Removed HttpClient injection
  // ✅ Injected UserService for handling API calls
  constructor(private userService: UserService, private router : Router) {}

  onLogin(form: any): void {
    if(form.valid) {
      const loginPayload = {
        email : form.value.email,
        password: form.value.password,
      }

      // ✅ Calling the centralized login method in UserService
      this.userService.login(loginPayload) 
        .subscribe({
          next: (res: any) => {
            console.log('Login success:', res);
            
            //store the token securely
            localStorage.setItem('token', `${res.id}`)

            //optionally store other user info
            localStorage.setItem('email', loginPayload.email)
            localStorage.setItem('firstName', res.firstName || 'User')

            //Navigate to dashboard
            this.router.navigate(['/dashboard'])
          },
          error: (err) => {
            console.error('Login failed:', err)
            alert(err.status === 401 ? 'Invalid email or password' : 'Something went wrong')
          }
        })
    } else {
      alert('Form is invalid')
    }
  }
}