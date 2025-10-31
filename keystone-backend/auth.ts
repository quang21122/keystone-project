import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import 'dotenv/config';

let sessionSecret = process.env.SESSION_SECRET;
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

export const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: { isAdmin: true },
  },
});

export const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});
