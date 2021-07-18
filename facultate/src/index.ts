import { app } from "./app";
import mongoose from 'mongoose';
import { natsWrapper } from "./nats-wrapper";
import { ProfesorCreatedListener } from "./events/listener/profesor-created-listener";
import { ProfesorUpdatedListener } from "./events/listener/profesor-updated-listener";
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

    new ProfesorCreatedListener(natsWrapper.client).listen();
    console.log("Listener for ProfesorCreated created and listening");
    new ProfesorUpdatedListener(natsWrapper.client).listen();
    console.log("Listener for ProfesorUpdated created and listening");

    await mongoose.connect('mongodb+srv://george:NocbVDCoEPfgNoGv@clusterlicenta.mqtzs.mongodb.net/Facultate?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('Connected to MongoDb database Facultate');
  } catch (err) {
    console.error(err);
  }
  app.listen(3502, () => {
    console.log('Listening on port 3502.');
  });
};
start();