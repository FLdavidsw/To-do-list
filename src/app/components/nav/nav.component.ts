import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  
  profile: User | null = null; 
  reviewedProfile = true;
  
  constructor(
    private router: Router,
    private authService: AuthService,
  ){}

  ngOnInit() {
    this.authService.user
    .subscribe(user => {
      if (user !== null) {
        this.profile = user;
        this.reviewedProfile = true; 
      }else{
        this.reviewedProfile = false;
      }
    });
  }

  redirectProfile() {
    this.router.navigate(['/profile']);
  }

}
