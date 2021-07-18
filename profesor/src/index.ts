import mongoose from 'mongoose';
import { natsWrapper } from './nats-wrapper';
import { ColaborareAcceptataListener } from './events/listeneres/colaborare-acceptat-listener';
import { app } from './app';
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
    await mongoose.connect('mongodb+srv://george:NocbVDCoEPfgNoGv@clusterlicenta.mqtzs.mongodb.net/Profesor?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    new ColaborareAcceptataListener(natsWrapper.client).listen();

    console.log('Connected to MongoDb database Profesor');
  } catch (err) {
    console.error(err);
  }
  app.listen(3501, () => {
    console.log('Listening on port 3501.');
  });
};
start();