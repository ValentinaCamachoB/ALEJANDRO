import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup;
  serverError = '';

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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

    const { name, email, password } = this.form.value;

    this.authService.register(name, email, password).subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: (err) => {
        this.serverError =
          err?.error?.error?.message ?? 'No se pudo completar el registro.';
      },
    });
  }
}
