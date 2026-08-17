import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  get isAuth(): boolean {
    return this.authService.isAuthenticated;
  }

  get role(): string | null {
    return this.authService.role;
  }

  onLogout() {
    this.authService.logout().subscribe({
      complete: () => this.router.navigate(['/auth/login']),
    });
  }
}
