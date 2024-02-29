import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { CreateService } from '../../services/create-task.service';
import { TaskComponent } from '../task/task.component';
import { CreateTaskComponent } from '../create-task/create-task.component';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
            CommonModule, 
            ReactiveFormsModule, 
            TaskComponent, 
            CreateTaskComponent,
          ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent{
  myTasks: Task[] = []
  constructor(
    private createService: CreateService
  ){}
  ngOnInit(): void {
    this.createService.getInitialTask();
    this.createService.myTasks$.subscribe(tasks => {
      this.myTasks = tasks;
    })
  }
}
