import { gql } from "apollo-server-express";

const typeDef = gql`
  type Donation {
    id: ID!
    donor: Donor!
    charity: Charity!
    amount: Float!
    currency: Currency!
    donated_on: String
    created_at: String
  }

  extend type Query {
    donations: [Donation]!
  }

  extend type Mutation {
    createDonation(
      donor_id: ID!
      charity_id: ID!
      amount: Float!
      currency_code: String!
      donated_on: String
    ): Donation!
  }
`;
export default typeDef;
