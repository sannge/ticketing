import { Publisher, OrderCreatedEvent, Subjects } from '@sanngetickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
