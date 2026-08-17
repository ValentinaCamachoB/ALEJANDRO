import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-create',
  standalone: false,
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss',
})
export class TicketCreateComponent {
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private router = inject(Router);

  form: FormGroup;
  serverError = '';

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['medium', [Validators.required]],
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

    this.ticketService.createTicket(this.form.value).subscribe({
      next: (ticket) => this.router.navigate(['/tickets', ticket.id]),
      error: (err) => {
        this.serverError =
          err?.error?.error?.message ?? 'No se pudo crear el ticket.';
      },
    });
  }

  onCancel() {
    this.router.navigate(['/tickets']);
  }
}
