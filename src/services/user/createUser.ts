import bcrypt from 'bcrypt';
import { SignUpRequestInput } from 'generated';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';

export async function createUser(
  userData: SignUpRequestInput
): Promise<boolean> {
  const userAlreadyExists = await checkIfUserAlreadyExists(userData.email);
  if (userAlreadyExists) {
    return true;
  }
  const userRepo = getRepository(User);
  const newUser = userRepo.create({
    ...userData,
    password: bcrypt.hashSync(
      userData.password,
      Number(process.env.CRYPT_ROUNDS)
    )
  });
  try {
    await userRepo.save(newUser);
  } catch (err) {
    console.error(err);
    throw new Error('[createUser] Problem while adding new user to db');
  }
  return true;
}

async function checkIfUserAlreadyExists(userEmail: string): Promise<boolean> {
  const userRepo = getRepository(User);
  let user;
  try {
    user = await userRepo.findOne({ email: userEmail });
  } catch (err) {
    console.error(err);
    throw new Error('[checkIfUserAlreadyExists] Problem while finding user');
  }
  if (user) {
    return true;
  }
  return false;
}
