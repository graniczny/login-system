import { ApolloServer } from 'apollo-server-koa';
import koa from 'koa';

import { resolvers, typeDefs } from './graphql';
import middlewares from './middlewares';

const server = new ApolloServer({ typeDefs, resolvers });
const app = new koa();
app.use(middlewares());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
