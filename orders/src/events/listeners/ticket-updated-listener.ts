import { Message } from 'node-nats-streaming';
import { Subjects, TicketUpdatedEvent, Listener } from '@sanngetickets/common';
import { Ticket } from '../../models/Ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdate = Subjects.TicketUpdate;

  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket not found/version mismatch');
    }

    const { title, price, version } = data;

    ticket.set({
      title,
      price,
      version,
    });

    await ticket.save();

    msg.ack();
  }
}
