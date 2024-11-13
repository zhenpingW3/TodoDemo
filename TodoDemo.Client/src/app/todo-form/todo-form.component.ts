import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnInit {

  //父组件会向子组件传递一个 函数，这个函数名为 refresh
  @Input() refresh!: () => void;

  validateForm!: FormGroup;

  submitForm(value: { title: string, completed: boolean, description:string }) {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    value.completed = false;
    value.description = "";

    this.todoListService.create(value).subscribe(result => {

      this.nzMessageService.info('Todo created');
      this.refresh();
    });

    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder, private todoListService: TodoListService, private nzMessageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }
}
