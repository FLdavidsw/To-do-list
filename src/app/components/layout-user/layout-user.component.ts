import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-user',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout-user.component.html',
  styleUrl: './layout-user.component.scss'
})
export class LayoutUserComponent {

}
