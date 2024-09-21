import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalstorageService } from './localstorage.service';

import { Task } from '@models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private tasks: Task[] = [];
  private mytasks$ = new BehaviorSubject<Task[]>([]);
  private editState$ = new BehaviorSubject<boolean>(false);
  private createState$ = new BehaviorSubject<boolean>(false);
  firstTitle = '';
  task!: Task[];
  idTask!: number;
  myTasks = this.mytasks$.asObservable();
  editState = this.editState$.asObservable();
  createState = this.createState$.asObservable();
 
  constructor(
    private localstorage: LocalstorageService
  ) { }
  
  addTask(task: Task) {
    task['createdState'] = true;
    this.tasks.push(task);
    this.mytasks$.next(this.tasks);
    this.localstorage.setItem('tasks', this.tasks);
    this.localstorage.updateItem('tasks', this.tasks);
  }
  getInitialTask(){
    const previousTasks = this.localstorage.getItem('tasks');
    if(previousTasks === null) {
      this.localstorage.setItem('tasks', this.tasks);
    }else{
   
      this.tasks = Object.values(previousTasks);
    }
    this.mytasks$.next(this.tasks);
  }
  deleteTask(title: string) {
    this.idTask = this.tasks.findIndex(item => item.title === title);
    this.tasks.splice(this.idTask, 1);
    this.mytasks$.next(this.tasks);
    this.localstorage.setItem('tasks', this.tasks);
  }
  editTask(title: string, editedTask: any) {
    this.firstTitle = title;
    this.idTask = this.tasks.findIndex(item => item.title === this.firstTitle);
    this.tasks[this.idTask] = editedTask;
    this.localstorage.setItem('tasks', this.tasks);
  }
  changeCreateStateOpen() {
    if(this.tasks.length > 0) {
      this.tasks.forEach(item => {
        if(item.editState === true){
          item.editState = false;
        }
      })
    }
    this.editState$.next(true);
    this.createState$.next(true);
  }
  changeCreateStateClose() {
    this.editState$.next(true);
    this.createState$.next(false);
  }
  changeEditState(title: string) {
    this.idTask = this.tasks.findIndex(item => item.title === this.firstTitle);
    this.tasks.forEach(item => {
      if(item.title === title){
        item.editState = true;
      }else {
        item.editState = false;
      }
    })
    this.mytasks$.next(this.tasks);
    this.editState$.next(false);
    this.createState$.next(false);
  }

}
