import mongoose from 'mongoose';
import { app } from './app';
const start = async () => {
  if (!process.env.jwt) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb+srv://george:NocbVDCoEPfgNoGv@clusterlicenta.mqtzs.mongodb.net/User?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });


    console.log('Connected to MongoDb database Users');
  } catch (err) {
    console.error(err);
  }
  app.listen(3504, () => {
    console.log('Listening on port 3504.');
  });
};
start();