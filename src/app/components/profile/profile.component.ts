import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { AuthService } from '@services/auth.service';

import { User } from '@models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  profile: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user === user) {
        this.profile = user;
      }else{
        this.router.navigate(['.']);
      }
    });
  }

}
