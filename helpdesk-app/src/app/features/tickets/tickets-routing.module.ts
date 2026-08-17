import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { TicketCreateComponent } from './pages/ticket-create/ticket-create.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
  },
  {
    path: 'create',
    component: TicketCreateComponent,
    canActivate: [roleGuard],
    data: { roles: ['client', 'admin'] },
  },
  {
    path: ':id',
    component: TicketDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
