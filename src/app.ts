import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql/schema";
import { sequelize } from "./db/database";
import { initModels } from "./db/models/init-models";

const startServer = async () => {
  const app = express();

  // Create a new Apollo Server instance
  const server = new ApolloServer({
    schema: schema,
  });

  //init db
  initModels(sequelize);

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
};

startServer();
