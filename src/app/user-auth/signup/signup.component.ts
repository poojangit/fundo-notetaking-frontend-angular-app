import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm : FormGroup ;
  title = "Create your google account" // One-way data binding (Interpolation)

  constructor(
    private fb: FormBuilder ,
    private userService: UserService,
    private router : Router
  ){
    this.signupForm = this.createSignupForm()
  }

  //Build the form group with validators
  private createSignupForm(): FormGroup {
    return this.fb.group({
      firstName : ['', [Validators.required, this.firstLetterUppercaseValidator()]],
      lastName : ['', Validators.required],
      username : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', Validators.required]
    } , {validators: this.passwordMatchValidator})
  }

  //Getters for form controls
  get firstName() : AbstractControl { return this.signupForm.get('firstName')!}
  get lastName() : AbstractControl {return this.signupForm.get('lastName')!}
  get username() : AbstractControl {return this.signupForm.get('username')!}
  get password() : AbstractControl { return this.signupForm.get('password')!}
  get confirmPassword() : AbstractControl {return this.signupForm.get('confirmPassword')!}

  //Validator to check if first letter is uppercase or not
  private firstLetterUppercaseValidator() : ValidatorFn{
    return (control : AbstractControl) => {
      const value = control.value
      return (value && value[0] !== value[0].toUpperCase())
        ? {firstLetterNotUppercase : true}
        : null
    }
  }

  //Validator to check if password match
  private passwordMatchValidator(formGroup: FormGroup) : {[key: string]: boolean} | null {
    const password = formGroup.get('password')?.value
    const confirm = formGroup.get('confirmPassword')?.value
    return password === confirm ? null : {passwordsMismatch : true}
  }

  //Toggle password visibility for both fields
  togglePassword(event: Event): void {
    const show = (event.target as HTMLInputElement).checked
    const type = show ? 'text' : 'password';
    ['password', 'confirmPassword'].forEach(name => {
      const input = document.querySelector(`input[formControlName = "${name}"]`) as HTMLInputElement
      if(input) input.type = type
    })
  }

  onSubmit() : void {
    if(this.signupForm.invalid){
    this.signupForm.markAllAsTouched()
    return
    }

    const {firstName, lastName, username, password} = this.signupForm.value

    const payload = {
      firstName,
      lastName,
      email: username,
      password,
    }

    console.log('Signup payload:', payload)
    this.userService.signUp(payload).subscribe({
      next: () => {
        alert('Signup successful! Redirecting to login...')
        this.router.navigate(['/login'])
      },
      error: (error) => {
        if(error.status === 422 && error.error?.message?.includes("Email already exists")) {
          alert('Email already registered. Please use a different email')
        } else {
          alert("Something went wrong. Please try again.")
        }

      }
    })
  }
  
}
