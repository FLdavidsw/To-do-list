import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { CreateService } from '../../services/create-task.service';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit{
  addingTask = false;
  generalEditState = false;
  task: Task = {
    title: '',
    description: '',
    deadline: '',
    priority: '',
    editState: false
  };
  newTaskCtrl = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ]
    }),
    description: new FormControl('', {nonNullable: true}),
    deadline: new FormControl('', {nonNullable: true}),
    priority: new FormControl('', {nonNullable: true}),
  })
  constructor (
    private createService: CreateService
  ) {}

  ngOnInit(): void {
    //apply a zip function to make both procedures at the same time
    this.createService.editState$.subscribe(edit => {
      this.generalEditState = edit;
    });
    this.createService.createState$.subscribe(create => {
      this.addingTask = create;
    });
  }
  changeState(){
    this.addingTask = !this.addingTask;
    this.createService.changeCreateState();
  }
  createTask(){
    this.createService.addTask({
      title: this.task.title,
      description: this.task.description,
      deadline: this.task.deadline,
      priority: this.task.priority,
      editState: false
    })
  }
  onSubmit(){
    if(typeof(this.newTaskCtrl.value.title) === "string" 
      && typeof(this.newTaskCtrl.value.description) === "string" 
      && typeof(this.newTaskCtrl.value.deadline) === "string" 
      && typeof(this.newTaskCtrl.value.priority) === "string"){
        this.task = {
          title: this.newTaskCtrl.value.title,
          description: this.newTaskCtrl.value.description,
          deadline: this.newTaskCtrl.value.deadline,
          priority: this.newTaskCtrl.value.priority, 
          editState: false
        }
      }
    this.createTask();
    this.newTaskCtrl.reset();
    this.addingTask = !this.addingTask;
  }
  onCancel(){
    this.addingTask = !this.addingTask;
  }
}

