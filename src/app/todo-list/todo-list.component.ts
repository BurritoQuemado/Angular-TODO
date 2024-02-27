import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    NzCardModule, 
    NzInputModule, 
    NzListModule, 
    NzIconModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    ReactiveFormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  tasks: { id:number, desc: string, completed: boolean}[] = []

  borrar(taskID: number) {
    this.tasks = this.tasks.filter(t => t.id !== taskID);
  }

  completeTask(taskID: number){
    const currentTaskIndex = this.tasks.findIndex(t => t.id === taskID);
    this.tasks[currentTaskIndex].completed = !this.tasks[currentTaskIndex].completed;
  }

  edit() {
    alert("Edit")
  }

  validateForm: FormGroup<{
    newTask: FormControl<string>;

  }> = this.fb.group({
    newTask: ['', [Validators.required]],
  });

  submitForm(): void {
    if(this.validateForm.value.newTask !== ''){
      const lastId = this.tasks.length !== 0 ? this.tasks[this.tasks.length -1].id : 0;
      const newTaskObj = {
        id: lastId + 1,
        desc: this.validateForm.value.newTask || 'New Task',
        completed: false 
      }
      this.tasks.push(newTaskObj);
      console.log(this.tasks)
    }
  }

  constructor(private fb: NonNullableFormBuilder) {}
}
