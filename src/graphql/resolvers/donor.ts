import { donor, donorCreationAttributes } from "../../db/models/init-models";

const resolvers = {
  Query: {
    donors: async () => {
      try {
        const donors = await donor.findAll();
        return donors;
      } catch (error) {
        console.error(`Error fetching donors: ${error}`);
        throw new Error("Failed to fetch donors.");
      }
    },
  },
  Mutation: {
    createDonor: async (_: any, attr: donorCreationAttributes) => {
      try {
        const newDonor = await donor.create(attr);
        return newDonor;
      } catch (error) {
        console.error(`Error creating Donor: ${error}`);
        throw new Error("Failed to create Donor");
      }
    },
  },
};

export default resolvers;
