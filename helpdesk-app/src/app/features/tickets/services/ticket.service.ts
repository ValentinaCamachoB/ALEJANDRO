import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Comment, PaginatedResult, Ticket, TicketFilters } from '../models/ticket.model';

interface SingleResponse<T> {
  data: T;
}

interface TicketsApiResponse {
  data: Ticket[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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

    return this.http
      .get<TicketsApiResponse>(this.API_URL, { params })
      .pipe(
        map((res) => ({
          data: res.data,
          total: res.meta.total,
          page: res.meta.page,
          limit: res.meta.limit,
        }))
      );
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http
      .get<SingleResponse<Ticket>>(`${this.API_URL}/${id}`)
      .pipe(map((res) => res.data));
  }

  createTicket(data: { title: string; description: string; priority: string }): Observable<Ticket> {
    return this.http
      .post<SingleResponse<Ticket>>(this.API_URL, data)
      .pipe(map((res) => res.data));
  }

  updateTicket(id: string, data: Partial<Ticket>): Observable<Ticket> {
    return this.http
      .patch<SingleResponse<Ticket>>(`${this.API_URL}/${id}`, data)
      .pipe(map((res) => res.data));
  }

  assignTicket(id: string, agentId: string): Observable<Partial<Ticket>> {
    return this.http
      .post<SingleResponse<Partial<Ticket>>>(`${this.API_URL}/${id}/assign`, { agentId })
      .pipe(map((res) => res.data));
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http
      .get<PaginatedResult<Comment>>(`${this.API_URL}/${id}/comments`)
      .pipe(map((res) => res.data));
  }

  addComment(id: string, body: string): Observable<Comment> {
    return this.http
      .post<SingleResponse<Comment>>(`${this.API_URL}/${id}/comments`, { body })
      .pipe(map((res) => res.data));
  }
}