import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginFormComponent } from '@components/login-form/login-form.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule, 
    RouterOutlet,
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
}
