import jwt from 'jsonwebtoken';

import { User } from '../entity/User';

export const authHelper = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: any, decoded: Partial<User>) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded);
      }
    );
  });
};
