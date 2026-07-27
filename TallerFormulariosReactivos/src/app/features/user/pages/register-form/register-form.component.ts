import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function passwordsIguales(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsNoCoinciden: true });
    } else if (confirmPassword.hasError('passwordsNoCoinciden')) {
      confirmPassword.setErrors(null);
    }
    return null;
  };
}

function sinEspacios(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (valor && valor.includes(' ')) {
      return { conEspacios: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  form: FormGroup;
  mostrarPassword = false;
  mostrarConfirmar = false;
  registroExitoso = false;
  resumen: any = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        username: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/), sinEspacios()],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        age: [null, [Validators.required, Validators.min(15), Validators.max(90)]],
        terms: [false, [Validators.requiredTrue]],
      },
      { validators: passwordsIguales() },
    );
  }

  isInvalid(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(errorCode) && control.touched;
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmar() {
    this.mostrarConfirmar = !this.mostrarConfirmar;
  }

  limpiarFormulario() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      const datos = this.form.value;
      this.resumen = {
        name: datos.name,
        email: datos.email,
        username: datos.username,
        age: datos.age,
      };
      this.registroExitoso = true;
      this.form.reset();
      this.form.disable();
    } else {
      this.form.markAllAsTouched();
    }
  }

  nuevoRegistro() {
    this.registroExitoso = false;
    this.resumen = null;
    this.form.enable();
    this.form.reset();
  }
}
