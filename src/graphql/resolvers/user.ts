import { createUser, loginUser } from '@services/user';
import { Context } from 'apollo-server-core';
import { LoginRequestInput, SignUpRequestInput } from 'generated';

export const userResolves = {
  Query: {
    hello: () => 'Hello tibia!'
  },
  Mutation: {
    test: (_: any, variables: any, ctx: Context<any>) => {
      const { user } = ctx;
      if (!user) {
        console.error(`[test()] Attempt made by unauthorized user`);
        throw Error(`Unauthorized`);
      }
      return user.email;
    },
    createUser: async (_: any, variables: any) => {
      const request: SignUpRequestInput = variables.request;
      const user = await createUser(request);
      return user;
    },
    loginUser: async (_: any, variables: any) => {
      const request: LoginRequestInput = variables.request;
      const user = await loginUser(request);
      return user;
    }
  }
};
