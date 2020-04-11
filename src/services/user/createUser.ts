import { SignUpRequestInput } from 'generated';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';

export async function createUser(
  userData: SignUpRequestInput
): Promise<boolean> {
  const userRepo = getRepository(User);
  const newUser = userRepo.create(userData);
  try {
    await userRepo.save(newUser);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
