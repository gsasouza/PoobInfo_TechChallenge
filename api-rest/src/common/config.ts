import path from 'path';
import dotenvSafe from 'dotenv-safe';

// @ts-ignore
const root = path.join.bind(this, __dirname, '../../');

dotenvSafe.load({
  path: root('.env'),
  sample: root('.env.example'),
});

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/database';
export const PORT = process.env.PORT || 5000;
