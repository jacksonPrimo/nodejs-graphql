import "reflect-metadata";
import 'dotenv/config';
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql'
import { UsersResolver } from "./resolvers/users-resolver";
import { PostResolver } from "./resolvers/posts-resolver";
const path = require('node:path')

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [UsersResolver, PostResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  })

  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

  console.log('http server running on', url)
}

bootstrap()