import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskComponent } from './components/task/task.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: 
      [
        CommonModule, 
        RouterOutlet, 
        ListComponent,
        CreateTaskComponent,
        TaskComponent
      ]
})
export class AppComponent {
  title = 'to-do-list';
}
