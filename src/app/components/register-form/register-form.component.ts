import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';

import { AuthService } from '@services/auth.service';

import { RequestStatus } from '@models/request-status';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  status: RequestStatus = 'init';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  signUpForm = new FormGroup({
    name: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    email: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
      ]
    }),
    password: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8)
      ]
    }),
    confirmPassword: new FormControl('',{
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
    },
    {
      validators: this.passwordMatchValidator,
    });

    constructor(
      private router: Router,
      private authService: AuthService
    ){}
    
    signUp(){
      if(this.signUpForm.valid){
        const { name, email, password } = this.signUpForm.getRawValue();
        this.authService.register(name, email, password)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/user/login']);
          },
          error: () => {
            this.status = 'failed';
          }
        })
      } else {
        this.signUpForm.markAllAsTouched();
      }
    }
    
    passwordMatchValidator(control: AbstractControl) {
      return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { mismatch: true};
    }

    togglePasswordVisibility(selector: number){
      if(selector === 1) {
        this.showPassword1 = !this.showPassword1;
      }else{
        this.showPassword2 = !this.showPassword2;
      }
    }
}
