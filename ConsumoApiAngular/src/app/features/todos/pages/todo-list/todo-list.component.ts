import { Component, Input } from '@angular/core';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
}