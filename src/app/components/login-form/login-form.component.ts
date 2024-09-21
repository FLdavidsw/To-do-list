import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '@services/auth.service';
import { RequestStatus } from '@models/request-status';
import { User } from '@models/user.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule ,FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit{

  showPassword: boolean = false;
  status: RequestStatus = 'init';
  loginForm = new FormGroup({
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
        Validators.required
      ]
    }),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.authService.emailRegistered
    .subscribe(email => {
      if (email !== null) {
       const emailField = this.loginForm.get('email');
       emailField?.setValue(email);
      }
    });
  }

  logIn(){
    if (this.loginForm.valid){
      this.status = 'loading';
      const { email, password } = this.loginForm.getRawValue();
      this.authService.loginAndGet(email, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/home']);
        },
        error: () => {
          this.status = 'failed';
        }
      });
    }else {
      this.loginForm.markAllAsTouched();
    }

  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}
