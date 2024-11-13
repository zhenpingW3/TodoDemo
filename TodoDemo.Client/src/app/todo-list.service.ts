import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private resourceUrl = "https://localhost:44310";

  constructor(private http: HttpClient) {
  }

  create(todo: Todo): Observable<Todo> {
    //在Angular中，方法返回的Observable是一种用于处理异步数据流的对象。Observable是ReactiveX（RxJS）库的核心之一，Angular使用它来处理许多异步操作，尤其是HTTP请求、事件流、用户输入等情况
    const copy = this.convert(todo);
    return this.http.post<Todo>(`${this.resourceUrl}/api/todo`, copy);
  }

  update(todo: Todo): Observable<Todo> {
    const copy = this.convert(todo);
    return this.http.put<Todo>(`${this.resourceUrl}/api/todo/${copy.id}`, copy);//`${this.resourceUrl}/api/todos/UpdateTodo/${copy.id}`
  }

  find(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.resourceUrl}/api/todo/${id}`);
  }

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.resourceUrl}/api/todo`);
  }

  delete(id: number | undefined): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/api/todo/${id}`);
  }

  private convert(todo: Todo): Todo {
    const copy: Todo = Object.assign({}, todo);
    //Object.assign 是一个用于将一个或多个源对象的属性复制到目标对象的JavaScript方法。它的主要作用是浅拷贝对象的属性，常用于合并对象或创建对象的副本
    return copy;
  }
}
