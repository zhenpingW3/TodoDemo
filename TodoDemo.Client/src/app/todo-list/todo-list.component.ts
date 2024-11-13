import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs/internal/Observable';
import { TodoListService } from '../todo-list.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent{

  //定义了一个名为 todos$ 的 Observable，它的类型是 Observable<Todo[]>
  //在Angular或RxJS的编程中，通常会使用$符号结尾来表示一个变量是Observable，这是一个约定俗成的命名习惯，以方便区分哪些变量是数据流或异步数据源。
  todos$!: Observable<Todo[]>;

  constructor(private todoListService: TodoListService, private nzMessageService: NzMessageService) {

  }

  loadAll = () => {
    this.todos$ = this.todoListService.findAll();
  }

  changeStatus(todo: Todo) {

    this.todoListService.update(todo)
      .subscribe(result => {
      this.todos$ = this.todoListService.findAll();
    });

    this.nzMessageService.info('Changed Status');
  }

  deleteTodo(todo: Todo) {

    this.todoListService.delete(todo.id)
      .subscribe(result => {
        this.todos$ = this.todoListService.findAll();
      });

    this.nzMessageService.warning('Todo Deleted');
  }

  cancel(): void {
    this.nzMessageService.info('Click cancelled');
  }

  ngOnInit(): void {
    this.todos$ = this.todoListService.findAll();
  }
}
