import {
  charity,
  charityCreationAttributes,
} from "../../db/models/init-models";

const resolvers = {
  Query: {
    charities: async () => {
      try {
        const charities = await charity.findAll();
        return charities;
      } catch (error) {
        console.error(`Error fetching charities: ${error}`);
        throw new Error("Failed to fetch charities.");
      }
    },
  },
  Mutation: {
    createCharity: async (_: any, attr: charityCreationAttributes) => {
      try {
        const newCharity = await charity.create(attr);
        return newCharity;
      } catch (error) {
        console.error(`Error creating charity: ${error}`);
        throw new Error("Failed to create charity");
      }
    },
  },
};
export default resolvers;
