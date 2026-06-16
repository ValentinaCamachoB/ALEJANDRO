import { ChangeDetectorRef, Component } from '@angular/core';
import { Todo } from './features/todos/model/todo.model';
import { TodoService } from './features/todos/services/todo.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef,
  ) {}

  onClick() {
  this.todoService.getTodos().subscribe({
    next: (data: Todo[]) => {
      this.todos = data;
      this.cdr.detectChanges();
    },
    error: (err: any) => {
      console.error('Error:', err);
    },
    complete: () => {
      alert('Tareas cargadas');
    },
  });
}
}