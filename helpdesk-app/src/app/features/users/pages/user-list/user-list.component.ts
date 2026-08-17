import { Component, inject, OnInit } from '@angular/core';
import { ManagedUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  users: ManagedUser[] = [];
  errorMessage = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message ?? 'No se pudieron cargar los usuarios.';
      },
    });
  }

  onChangeRole(user: ManagedUser) {
    this.userService.updateUserRole(user.id, user.role).subscribe({
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message ?? 'No se pudo actualizar el rol.';
      },
    });
  }
}
