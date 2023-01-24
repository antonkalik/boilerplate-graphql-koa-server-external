const Koa = require('koa');
const http = require('http');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { koaMiddleware } = require('@as-integrations/koa');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = new Koa();
const httpServer = http.createServer(app.callback());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await apolloServer.start();

  app.use(cors());
  app.use(bodyParser());
  app.use(
    koaMiddleware(apolloServer, {
      context: async ({ ctx }) => ({ token: ctx.headers.token }),
    })
  );

  const resolveHttpServer = resolve => httpServer.listen({ port: process.env.PORT }, resolve);
  await new Promise(resolveHttpServer);

  console.log(`🚀 External server ready at http://localhost:${process.env.PORT}/api/v1/graphql`);
})();
