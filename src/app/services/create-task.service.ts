import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  private tasks: Task[] = [
    {
      title: 'training',
      description: 'Back and Biceps',
      deadline: '',
      priority: '',
      editState: false
    },
    {
      title: 'Study',
      description: '',
      deadline: 'Monday',
      priority: '',
      editState: false
    },
  ];
  private mytasks = new BehaviorSubject<Task[]>([]);
  //private edit = false;
  private editState = new BehaviorSubject<boolean>(false);
  //private create = false;
  private createState = new BehaviorSubject<boolean>(false);

  firstTitle = '';
  task!: Task[];
  idTask!: number;
  //PENDING: Look up how to declarate observables, as I saw that the observables don't
  //have the money symbol, instead, this symbol has to be added to the BehaviorSubjects
  myTasks$ = this.mytasks.asObservable();
  editState$ = this.editState.asObservable();
  createState$ = this.createState.asObservable();

  constructor() { }
  
  addTask(task: Task) {
    this.tasks.push(task);
    this.mytasks.next(this.tasks);
  }
  getInitialTask(){
    this.mytasks.next(this.tasks);
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.mytasks.next(this.tasks);
  }
  editTask(title: string, editedTask: any) {
    this.firstTitle = title;
    this.idTask = this.tasks.findIndex(item => item.title === this.firstTitle);
    this.tasks[this.idTask] = editedTask;
  }
  changeCreateState() {
    this.tasks.forEach(item => {
      if(item.editState === true){
        item.editState = false;
      }
    })
    this.editState.next(true);
    this.createState.next(true);
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
    this.mytasks.next(this.tasks);
    this.editState.next(false);
    this.createState.next(false);
  }

}
