import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connectd to NATs');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '12325',
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }
  // const data = JSON.stringify({
  //   id: '13243',
  //   title: 'concert',
  //   price: 20,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Ticket Created Event Published');
  // });
});
