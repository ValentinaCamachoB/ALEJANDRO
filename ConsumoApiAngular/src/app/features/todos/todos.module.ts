import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

@NgModule({
  declarations: [TodoCardComponent, TodoListComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [TodoListComponent],
})
export class TodosModule {}