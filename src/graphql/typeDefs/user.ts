const { gql } = require('apollo-server-koa');

export const userTypeDefs = gql`
  type Query {
    hello: String
  }

  input SignUpRequestInput {
    name: String
    password: String!
    email: String!
    role: Int!
  }

  type Mutation {
    test(name: String): String

    createUser(request: SignUpRequestInput): Boolean
  }
`;
