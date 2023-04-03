import express from "express";
import { ApolloServer } from "apollo-server-express";
import { pool } from "./db/db";
import { typeDef } from "./graphql/schemas/currency";
import { resolver } from "./graphql/resolvers/currency";

async function main() {
  const app = express();

  // Create a new Apollo Server instance
  const server = new ApolloServer({
    typeDefs: typeDef,
    resolvers: resolver,
    context: { pool }, // Pass the database pool to the resolvers through the context object
  });

  await server.start();

  // Apply the Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // Start the server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(
      `GraphQL server running at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

main();
