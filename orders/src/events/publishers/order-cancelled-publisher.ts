import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@sanngetickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
