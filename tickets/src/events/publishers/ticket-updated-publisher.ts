import { Publisher, Subjects, TicketUpdatedEvent } from '@sanngetickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdate = Subjects.TicketUpdate;
}
