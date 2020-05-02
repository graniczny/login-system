import bcrypt from 'bcrypt';
import { LoggedUser, LoginRequestInput } from 'generated';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';
import { createToken } from './auth';

export async function loginUser(
  loginRequest: LoginRequestInput
): Promise<LoggedUser> {
  const user = await findRegisteredUser(loginRequest);
  if (!user) {
    return {};
  }
  if (!bcrypt.compareSync(loginRequest.password, user.password)) {
    console.info('[loginUser] bad user password');
    return null;
  }
  const { name, email, role } = user;
  const token = await createToken({ name, email, role });

  return { name, email, role, token };
}

async function findRegisteredUser({
  email,
  password
}: LoginRequestInput): Promise<User> {
  const userRepo = getRepository(User);
  let user: User;
  try {
    user = await userRepo.findOne({ email });
  } catch (err) {
    console.error(err);
    throw new Error('[findRegisteredUser] Problem while finding user');
  }
  return user;
}
