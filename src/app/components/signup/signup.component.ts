import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { RegisterFormComponent } from '@components/register-form/register-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, RouterOutlet, RegisterFormComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  
}



