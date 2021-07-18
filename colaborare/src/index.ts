import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
const start = async () => {
  if (!process.env.jwt) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    await mongoose.connect('mongodb+srv://george:NocbVDCoEPfgNoGv@clusterlicenta.mqtzs.mongodb.net/Colaborare?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });


    console.log('Connected to MongoDb database Colaborare');
  } catch (err) {
    console.error(err);
  }
  app.listen(3503, () => {
    console.log('Listening on port 3503.');
  });
};
start();