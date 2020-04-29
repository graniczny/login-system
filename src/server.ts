import { authHelper } from '@helpers/authHelper';
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

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async obj => {
      let { ctx } = obj;
      if (!ctx) {
        ctx = obj.connection.context;
      }
      try {
        let user = null;
        let authorizationToken: string = null;

        if (ctx.request && ctx.request.header) {
          authorizationToken = ctx.request.header.authorization;
        }

        if (authorizationToken) {
          user = await authHelper(authorizationToken.replace('Bearer ', ''));
        }

        return {
          ...ctx,
          user,
          authorization: authorizationToken
        };
      } catch (err) {
        console.error(`Config server error: ${JSON.stringify(err)}`);
        return {
          authorization: null,
          ...ctx
        };
      }
    }
  });
  const app = new koa();
  app.use(middlewares());

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();
