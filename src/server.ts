import "reflect-metadata";
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql'
import { AppointmentsResolver } from './resolvers/appointments-resolver'
const path = require('node:path')

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      AppointmentsResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })

  const server = new ApolloServer({
    schema
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log('http server running on', url)
}

bootstrap()