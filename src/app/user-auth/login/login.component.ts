import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // constructor(private http: HttpClient, private router : Router) {}

  onLogin(form: any): void {
    if(form.valid) {
      const loginPayload = {
        email : form.value.email,
        password: form.value.password,
        service: 'advance'
      }
    }
  }
}
