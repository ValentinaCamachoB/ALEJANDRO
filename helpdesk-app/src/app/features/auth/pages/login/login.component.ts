import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;
  serverError = '';

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  isInvalid(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(errorCode) && control.touched;
  }

  onSubmit() {
    this.serverError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: () => this.redirectByRole(),
      error: (err) => {
        this.serverError =
          err?.error?.error?.message ?? 'Correo o contraseña inválidos.';
      },
    });
  }

  private redirectByRole() {
    const role = this.authService.role;
    if (role === 'admin') {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/tickets']);
    }
  }
}
