import { merge } from "lodash";
import { makeExecutableSchema } from "@graphql-tools/schema";
import Currency from "./typeDefs/currency";
import currencyResolvers from "./resolvers/currency";
import Donor from "./typeDefs/donor";
import donorResolvers from "./resolvers/donor";
import Charity from "./typeDefs/charity";
import charityResolvers from "./resolvers/charity";
import Donation from "./typeDefs/donation";
import donationResolvers from "./resolvers/donation";

const typeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, Currency, Donor, Charity, Donation],
  resolvers: merge(
    resolvers,
    currencyResolvers,
    donorResolvers,
    charityResolvers,
    donationResolvers
  ),
});
