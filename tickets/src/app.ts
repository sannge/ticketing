import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import {
  currentUser,
  errorHandler,
  NotFoundError,
} from '@sanngetickets/common';

import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

const app = express();
//ingress-inginx is routing the request using the proxy,
// and telling express that those proxys should be trusted
app.set('trust proxy', true);
//middlewares
app.use(json());
app.use(
  cookieSession({
    signed: false, //we are not encrypting the value inside cookie because the value is jwt, which is already encrypted
    secure: process.env.NODE_ENV !== 'test', //only valid for https requests
  })
);

app.use(currentUser);

app.use(showTicketRouter);
app.use(createTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
