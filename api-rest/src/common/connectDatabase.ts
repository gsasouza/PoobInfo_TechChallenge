import mongoose from 'mongoose';
import { MONGO_URI } from './config';

export default async () => {
  mongoose.Promise = global.Promise;
  mongoose.connection
    .on('error', error => {
      console.log('Connection to DB failed');
      throw error;
    })
    .on('close', () => {
      console.log('Connection to DB lost');
      process.exit(1);
    })
    .once('open', () => {
      console.log('Connected to DB');
      return;
    });
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
}
