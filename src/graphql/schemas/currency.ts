import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Currency {
    currency_code: String!
  }

  type Query {
    currencies: [Currency!]!
  }

  type Mutation {
    createCurrency(currency_code: String!): Currency!
  }
`;
