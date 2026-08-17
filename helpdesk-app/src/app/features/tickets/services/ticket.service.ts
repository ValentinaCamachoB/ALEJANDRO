import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResult, Ticket, TicketFilters } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly API_URL = `${environment.apiUrl}/tickets`;

  constructor(private http: HttpClient) {}

  getTickets(filters: TicketFilters = {}): Observable<PaginatedResult<Ticket>> {
    let params = new HttpParams();

    if (filters.status) {
      params = params.set('status', filters.status);
    }
    if (filters.priority) {
      params = params.set('priority', filters.priority);
    }
    if (filters.unassigned) {
      params = params.set('unassigned', 'true');
    }
    if (filters.page) {
      params = params.set('page', filters.page);
    }
    if (filters.limit) {
      params = params.set('limit', filters.limit);
    }

    return this.http.get<PaginatedResult<Ticket>>(this.API_URL, { params });
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_URL}/${id}`);
  }

  createTicket(data: { title: string; description: string; priority: string }): Observable<Ticket> {
    return this.http.post<Ticket>(this.API_URL, data);
  }

  updateTicket(id: string, data: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.API_URL}/${id}`, data);
  }

  addComment(id: string, text: string): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.API_URL}/${id}/comments`, { text });
  }

  assignTicket(id: string, agentId: string): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.API_URL}/${id}/assign`, { agentId });
  }
}
