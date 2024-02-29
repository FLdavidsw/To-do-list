import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

import { Task, editedTask } from '../../models/task.model';
import { CreateService } from '../../services/create-task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  @Input() task!: Task;
  //editState: boolean = false;
  generalEditState: boolean = false;
  previousTitle!: string
  editedCtrlTask = new FormGroup({
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
  editedTask!: Task;

  constructor(
    private createService: CreateService
  ){}
  ngOnInit(): void {
    this.createService.editState$.subscribe(edit => {
      this.generalEditState = edit;
    });
  }
  changeEditState(){
    const titleControl = this.editedCtrlTask.get('title');
    const descriptionControl = this.editedCtrlTask.get('description');
    const deadlineControl = this.editedCtrlTask.get('deadline');
    const priorityControl = this.editedCtrlTask.get('priority');
    if (titleControl) titleControl.setValue(this.task.title);
    if (descriptionControl) descriptionControl.setValue(this.task.description);
    if (deadlineControl) deadlineControl.setValue(this.task.deadline);
    if (priorityControl) priorityControl.setValue(this.task.priority);
    this.createService.changeEditState(this.task.title);
    this.generalEditState = !this.task.editState;
    this.previousTitle = this.task.title;
  }
  editTask(title: string, editedTask: Task){
    this.createService.editTask(this.task.title, this.editedTask);
  }
  onSubmit(){
    if(typeof(this.editedCtrlTask.value.title) === "string" 
      && typeof(this.editedCtrlTask.value.description) === "string" 
      && typeof(this.editedCtrlTask.value.deadline) === "string" 
      && typeof(this.editedCtrlTask.value.priority) === "string"){
        this.editedTask = {
          title: this.editedCtrlTask.value.title,
          description: this.editedCtrlTask.value.description,
          deadline: this.editedCtrlTask.value.deadline,
          priority: this.editedCtrlTask.value.priority,
          editState: false,
        }
      }
    this.editTask(this.previousTitle, this.editedTask);
    this.editedCtrlTask.reset();
  }
  onCancel(){
    this.task.editState = !this.task.editState;
  }

}
