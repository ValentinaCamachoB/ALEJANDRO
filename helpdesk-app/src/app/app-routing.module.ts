import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeComponent } from './shared/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tickets',
    loadChildren: () =>
      import('./features/tickets/tickets.module').then((m) => m.TicketsModule),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
