import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { animate, style, transition, trigger, state} from '@angular/animations';

import { fadeOut } from '@models/animations';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';

const fadeInOut = trigger('fadeInOut', [
  state(
    'open',
    style({
      opacity: 1,
    })
  ),
  state(
    'closed',
    style({
      opacity: 0,
    })
  ),
  transition('open => closed', [animate('1s ease-out')])
]);

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  animations: [
    fadeInOut,
    fadeOut
  ],
})
export class TaskComponent implements OnInit{
  @Input() task!: Task;
  @Input() idTask!: number;
  @Output() idDelete = new EventEmitter<number>();
  checkTask: boolean = false; 
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
    private taskService: TaskService
  ){}
  ngOnInit(): void {
    this.taskService.editState.subscribe(edit => {
      this.generalEditState = edit;
    });
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
          createdState: true,
        }
      }
    this.editTask(this.previousTitle, this.editedTask);
    this.editedCtrlTask.reset();
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
    this.taskService.changeEditState(this.task.title);
    this.generalEditState = !this.task.editState;
    this.previousTitle = this.task.title;
  }

  editTask(title: string, editedTask: Task){
    this.taskService.editTask(this.task.title, this.editedTask);
  }

  onDelete(){
    this.task.createdState = false
    //this.taskService.deleteTask(this.task.title);
  }
  onAnimationDone(event: any){
    if(this.task.createdState === false){
      this.taskService.deleteTask(this.task.title);
    }
  }

  onCancel(){
    this.task.editState = !this.task.editState;
  }

}
