import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

let mongo: any;

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51KikiUK9egb88kWTLQm5VaiM0oCRhCViqiMPHVlRBEFnxqrfc3IDbAL8WYhpnuwEWJzVyOUZE7LBN7ys1B4kK8ln0012c7Ak4b';

beforeAll(async () => {
  process.env.JWT_KEY = '265em ui8';
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  //Build a JWT payload {id, email, iat}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  //Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session Object {jwt: MY_JWT}
  const session = { jwt: token };

  //Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  //Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
