export const userResolves = {
  Query: {
    hello: () => 'Hello tibia!'
  },
  Mutation: {
    test: (_: any, variables: any) => {
      return variables.name
        .split('')
        .reverse()
        .join('');
    }
  }
};
