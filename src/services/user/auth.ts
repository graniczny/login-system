import jwt from 'jsonwebtoken';

import { User } from '../../entity/User';

async function createToken(user: Partial<User>): Promise<string> {
  return jwt.sign(user, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.TOKEN_EXPIRES || '24h'
  });
}

export { createToken };
