import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavComponent } from '@components/nav/nav.component';

import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token !== null){
      this.authService.getProfile()
      .subscribe();
    }
  }
  
}
