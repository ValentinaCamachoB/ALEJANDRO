import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Comment, Ticket } from '../../models/ticket.model';
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
  private cdr = inject(ChangeDetectorRef);

  ticket: Ticket | null = null;
  comments: Comment[] = [];
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
      return this.ticket.assignedTo === this.authService.currentUser?.id;
    }
    return false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTicket(id);
      this.loadComments(id);
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message ?? 'No se pudo cargar el ticket.';
        this.cdr.detectChanges();
      },
    });
  }

  loadComments(id: string) {
    this.ticketService.getComments(id).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.cdr.detectChanges();
      },
      error: () => {
        // Si falla la carga de comentarios, no bloqueamos el resto de la página.
      },
    });
  }

  onUpdate() {
    if (!this.ticket) {
      return;
    }
    this.updateError = '';
    const id = this.ticket.id;

    this.ticketService.updateTicket(id, this.updateForm.value).subscribe({
      next: () => {
        this.loadTicket(id);
      },
      error: (err) => {
        this.updateError =
          err?.error?.error?.message ?? 'No se pudo actualizar el ticket.';
        this.cdr.detectChanges();
      },
    });
  }

  onAssign() {
    if (!this.ticket || !this.agentIdToAssign.trim()) {
      return;
    }
    this.assignError = '';
    const id = this.ticket.id;

    this.ticketService.assignTicket(id, this.agentIdToAssign.trim()).subscribe({
      next: () => {
        this.agentIdToAssign = '';
        this.loadTicket(id);
      },
      error: (err) => {
        this.assignError =
          err?.error?.error?.message ?? 'No se pudo asignar el ticket.';
        this.cdr.detectChanges();
      },
    });
  }

  onAddComment() {
    if (!this.ticket || !this.newComment.trim()) {
      return;
    }
    const id = this.ticket.id;
    const body = this.newComment.trim();

    this.ticketService.addComment(id, body).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments(id);
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.error?.message ?? 'No se pudo agregar el comentario.';
        this.cdr.detectChanges();
      },
    });
  }
}