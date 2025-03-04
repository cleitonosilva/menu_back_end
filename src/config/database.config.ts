import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => {
      const mongoUri = process.env.MONGODB_URI;

      if (!mongoUri) {
        throw new Error('MONGODB_URI não foi definido no .env');
      }

      const connection = mongoose.connect(mongoUri);
      console.log('Connected to MongoDB');
      return connection;
    },
  },
];
