import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import 'dotenv/config';

export default withAuth(
  config({
    db: {
      provider: 'mysql',
      url: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/keystone',
      enableLogging: true,
    },
    server: {
      port: Number(process.env.PORT) || 3000,
      cors: {
        origin: ['http://localhost:5173'],
        credentials: true,
      },
    },
    lists,
    session,
  })
);
