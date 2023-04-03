import { gql } from "apollo-server-express";

const typeDef = gql`
  type Currency {
    currency_code: String!
  }

  extend type Query {
    currencies: [Currency]!
  }

  extend type Mutation {
    createCurrency(currency_code: String!): Currency!
  }
`;

export default typeDef;
