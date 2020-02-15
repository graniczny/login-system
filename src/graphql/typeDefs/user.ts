const { gql } = require('apollo-server-koa');

export const userTypeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    test(name: String): String
  }
`;
