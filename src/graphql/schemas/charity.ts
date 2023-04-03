import { gql } from "apollo-server-express";

export const typeDef = gql`
  type Charity {
    id: ID!
    charity_name: String!
    description: String
    address: String
    url: String
    email: String
    phone_number: String
    created_at: String
  }

  extend type Query {
    charities: [Charity!]!
  }

  extend type Mutation {
    createCharity(
      charity_name: String!
      description: String
      address: String
      url: String
      email: String
      phone_number: String
    ): Charity!
  }
`;
