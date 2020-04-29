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

  input LoginRequestInput {
    password: String!
    email: String!
  }

  type LoggedUser {
    name: String
    email: String
    role: Int
    token: String
  }

  type Mutation {
    test(name: String): String

    createUser(request: SignUpRequestInput): Boolean

    loginUser(request: LoginRequestInput): LoggedUser
  }
`;
