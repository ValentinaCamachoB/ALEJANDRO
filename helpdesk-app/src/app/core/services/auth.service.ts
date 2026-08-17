import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_KEY = 'user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/login`, { email, password })
      .pipe(tap((res) => this.saveSession(res)));
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(tap((res) => this.saveSession(res)));
  }

  logout(): Observable<unknown> {
    const refreshToken = this.refreshToken;
    return this.http
      .post(`${this.API_URL}/auth/logout`, { refreshToken })
      .pipe(tap(() => this.clearSession()));
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = this.refreshToken;
    return this.http
      .post<AuthResponse>(`${this.API_URL}/auth/refresh`, { refreshToken })
      .pipe(tap((res) => this.saveSession(res)));
  }

  private saveSession(res: AuthResponse) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
  }

  private clearSession() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  get currentUser(): User | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  get role(): UserRole | null {
    return this.currentUser?.role ?? null;
  }

  get isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }
}
