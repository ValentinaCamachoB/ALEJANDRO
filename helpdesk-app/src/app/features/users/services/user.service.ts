import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ManagedUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ManagedUser[]> {
    return this.http.get<ManagedUser[]>(this.API_URL);
  }

  updateUserRole(id: string, role: string): Observable<ManagedUser> {
    return this.http.patch<ManagedUser>(`${this.API_URL}/${id}/role`, { role });
  }
}
