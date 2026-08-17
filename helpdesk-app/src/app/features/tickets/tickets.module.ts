import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
import { TicketCreateComponent } from './pages/ticket-create/ticket-create.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketsRoutingModule } from './tickets-routing.module';

@NgModule({
  declarations: [
    TicketCardComponent,
    TicketListComponent,
    TicketDetailComponent,
    TicketCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TicketsRoutingModule,
  ],
})
export class TicketsModule {}
