export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Comment {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  clientId: string;
  agentId: string | null;
  createdAt: string;
  comments: Comment[];
}

export interface TicketFilters {
  status?: TicketStatus;
  priority?: TicketPriority;
  unassigned?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
