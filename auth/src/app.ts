import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signUpRouter } from './routes/signup';
import { signOutRouter } from './routes/signout';

import { errorHandler, NotFoundError } from '@sanngetickets/common';

const app = express();
//ingress-inginx is routing the request using the proxy,
// and telling express that those proxys should be trusted
app.set('trust proxy', true);
//middlewares
app.use(json());
app.use(
  cookieSession({
    signed: false, //we are not encrypting the value inside cookie because the value is jwt, which is already encrypted
    // secure: process.env.NODE_ENV !== 'test', //only valid for https requests
    secure: false,
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
