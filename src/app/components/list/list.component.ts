import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';
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
  styleUrl: './list.component.scss',
})
export class ListComponent{
  myTasks: Task[] = []
  myTasksCopy: any[] = [];
  idDelete!: number;
  constructor(
    private taskService: TaskService
  ){}
  ngOnInit(): void {
    this.taskService.getInitialTask();
    this.taskService.myTasks.subscribe(tasks => {
      this.myTasks = tasks;
    });
    if(this.myTasks.length > 0){
      this.myTasksCopy = this.myTasks.map(item => {
        return {
          ...item,
          createdState: true
        }
      });
    }

  }
  onDelete(id: number){
    this.idDelete = id;
    const div = document.getElementById("main-container");
    const div2 = document.getElementById(`task${id}`);
    if(div && div2){
      div.removeChild(div2);
    }
  }
}
