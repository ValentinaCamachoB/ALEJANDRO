import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ManagedUser } from '../models/user.model';

interface UsersResponse {
  data: ManagedUser[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ManagedUser[]> {
    return this.http
      .get<UsersResponse>(this.API_URL)
      .pipe(map((res) => res.data));
  }

  updateUserRole(id: string, role: string): Observable<ManagedUser> {
    return this.http.patch<ManagedUser>(`${this.API_URL}/${id}/role`, { role });
  }
}