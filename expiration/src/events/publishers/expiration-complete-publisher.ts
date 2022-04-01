import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@sanngetickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
