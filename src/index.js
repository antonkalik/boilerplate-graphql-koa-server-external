const Koa = require('koa');
const http = require('http');
const cors = require('@koa/cors');
const { ApolloServer } = require('apollo-server-koa');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function server({ typeDefs, resolvers }) {
  const app = new Koa();
  const httpServer = http.createServer();
  const apolloServer = new ApolloServer({
    introspection: true,
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/api/v1/graphql' });
  httpServer.on('request', app.callback());
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(
    `🚀 External Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );

  return { apolloServer, app };
}

server({ typeDefs, resolvers }).then(({ app }) => {
  app.use(cors());
});
