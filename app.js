import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import cors from 'cors'
import path from 'path'

const app = express();
app.use(cors())
app.use("/uploads", express.static('uploads'));
app.use(graphqlUploadExpress());
const server = new ApolloServer({ typeDefs, resolvers })

await server.start()
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
    console.log('Server ready at http://localhost:4000/graphql')
);