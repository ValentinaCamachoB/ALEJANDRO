import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, FormsModule, UsersRoutingModule],
})
export class UsersModule {}
