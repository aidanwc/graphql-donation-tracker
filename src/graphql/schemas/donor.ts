import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Donor {
    id: ID!
    email: String!
    first_name: String
    last_name: String
    address: String
    created_at: String
  }

  extend type Query {
    donors: [Donor!]!
  }

  extend type Mutation {
    createDonor(email: String!, first_name: String, last_name: String, address: String): Donor!
  }
`;