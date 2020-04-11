import { ApolloServer } from 'apollo-server-koa';
import dotenv from 'dotenv';
import koa from 'koa';
import { createConnection } from 'typeorm';

import { resolvers, typeDefs } from './graphql';
import middlewares from './middlewares';

dotenv.config();

(async function() {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 8080,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    entities: ['src/entity/*.ts'],
    logging: true,
    synchronize: true
  });

  const server = new ApolloServer({ typeDefs, resolvers });
  const app = new koa();
  app.use(middlewares());

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
