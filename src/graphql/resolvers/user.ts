import { createUser } from '@services/user';
import { SignUpRequestInput } from 'generated';

export const userResolves = {
  Query: {
    hello: () => 'Hello tibia!'
  },
  Mutation: {
    test: (_: any, variables: any) => {
      return 'Test route';
    },
    createUser: async (_: any, variables: any) => {
      const request: SignUpRequestInput = variables.request;
      const user = await createUser(request);
      return user;
    }
  }
};
