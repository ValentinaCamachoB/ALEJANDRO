import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: false,
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.scss',
})
export class TicketDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ticketService = inject(TicketService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  ticket: Ticket | null = null;
  updateForm: FormGroup;
  newComment = '';
  agentIdToAssign = '';

  errorMessage = '';
  updateError = '';
  assignError = '';

  constructor() {
    this.updateForm = this.fb.group({
      status: [''],
      priority: [''],
    });
  }

  get role(): string | null {
    return this.authService.role;
  }

  get canUpdate(): boolean {
    if (!this.ticket) {
      return false;
    }
    if (this.role === 'admin') {
      return true;
    }
    if (this.role === 'agent') {
      return this.ticket.agentId === this.authService.currentUser?.id;
    }
    return false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTicket(id);
    }
  }

  loadTicket(id: string) {
    this.ticketService.getTicketById(id).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.updateForm.patchValue({
          status: ticket.status,
          priority: ticket.priority,
        });
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message ?? 'No se pudo cargar el ticket.';
      },
    });
  }

  onUpdate() {
    if (!this.ticket) {
      return;
    }
    this.updateError = '';

    this.ticketService.updateTicket(this.ticket.id, this.updateForm.value).subscribe({
      next: (ticket) => (this.ticket = ticket),
      error: (err) => {
        this.updateError =
          err?.error?.error?.message ?? 'No se pudo actualizar el ticket.';
      },
    });
  }

  onAssign() {
    if (!this.ticket || !this.agentIdToAssign.trim()) {
      return;
    }
    this.assignError = '';

    this.ticketService.assignTicket(this.ticket.id, this.agentIdToAssign.trim()).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.agentIdToAssign = '';
      },
      error: (err) => {
        this.assignError =
          err?.error?.error?.message ?? 'No se pudo asignar el ticket.';
      },
    });
  }

  onAddComment() {
    if (!this.ticket || !this.newComment.trim()) {
      return;
    }

    this.ticketService.addComment(this.ticket.id, this.newComment.trim()).subscribe({
      next: (ticket) => {
        this.ticket = ticket;
        this.newComment = '';
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message ?? 'No se pudo agregar el comentario.';
      },
    });
  }
}
