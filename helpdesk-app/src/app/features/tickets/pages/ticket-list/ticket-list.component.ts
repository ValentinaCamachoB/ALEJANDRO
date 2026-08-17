import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Ticket, TicketPriority, TicketStatus } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: false,
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent implements OnInit {
  private ticketService = inject(TicketService);
  private authService = inject(AuthService);

  tickets: Ticket[] = [];
  total = 0;
  page = 1;
  limit = 6;

  statusFilter = '';
  priorityFilter = '';
  unassignedOnly = false;

  errorMessage = '';

  get role(): string | null {
    return this.authService.role;
  }

  get canCreate(): boolean {
    return this.role === 'client' || this.role === 'admin';
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.errorMessage = '';

    this.ticketService
      .getTickets({
        status: (this.statusFilter || undefined) as TicketStatus | undefined,
        priority: (this.priorityFilter || undefined) as TicketPriority | undefined,
        unassigned: this.unassignedOnly || undefined,
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (res) => {
          this.tickets = res.data;
          this.total = res.total;
        },
        error: (err) => {
          this.errorMessage =
            err?.error?.error?.message ?? 'No se pudieron cargar los tickets.';
        },
      });
  }

  onFilterChange() {
    this.page = 1;
    this.loadTickets();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadTickets();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadTickets();
    }
  }
}
