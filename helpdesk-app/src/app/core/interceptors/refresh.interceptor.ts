import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshedToken$ = new BehaviorSubject<string | null>(null);

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isTokenExpired =
        error.status === 401 && error.error?.error?.code === 'TOKEN_EXPIRED';

      if (!isTokenExpired) {
        return throwError(() => error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshedToken$.next(null);

        return authService.refreshAccessToken().pipe(
          switchMap((res) => {
            isRefreshing = false;
            refreshedToken$.next(res.accessToken);
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            authService.logout().subscribe();
            return throwError(() => refreshError);
          }),
        );
      }

      return refreshedToken$.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          const retryReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next(retryReq);
        }),
      );
    }),
  );
};
