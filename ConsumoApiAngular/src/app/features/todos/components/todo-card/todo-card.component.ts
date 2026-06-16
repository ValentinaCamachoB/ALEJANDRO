import { Component, Input } from '@angular/core';
import { Todo } from '../../model/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: false,
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() todo!: Todo;
}