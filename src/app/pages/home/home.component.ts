import { Component } from '@angular/core';

import { ListComponent } from '@components/list/list.component';
import { CreateTaskComponent } from '@components/create-task/create-task.component';
import { TaskComponent } from '@components/task/task.component';
import { NavComponent } from '@components/nav/nav.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ListComponent,
    CreateTaskComponent,
    TaskComponent,
    NavComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{


}
