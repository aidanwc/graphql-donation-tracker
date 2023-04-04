import {
  donation,
  donor,
  charity,
  currency,
  donationCreationAttributes,
} from "../../db/models/init-models";
import { match } from "assert";
const resolvers = {
  Query: {
    donations: async () => {
      try {
        const donations = await donation.findAll();
        return donations;
      } catch (error) {
        console.error(`Error fetching donations: ${error}`);
        throw new Error("Failed to fetch donations.");
      }
    },
  },

  Mutation: {
    createDonation: async (_: any, attr: donationCreationAttributes) => {
      try {
        console.log(attr);
        const newDonation = await donation.create(attr);
        return newDonation;
      } catch (error) {
        console.error(`Error creating donation: ${error}`);
        throw new Error("Failed to create donation.");
      }
    },
  },

  Donation: {
    donor: async (parent: any) => {
      try {
        const matchingDonor = await donor.findByPk(parent.donor);
        return matchingDonor;
      } catch (error) {
        console.error(`Error fetching donor: ${error}`);
        throw new Error("Failed to fetch donor.");
      }
    },

    charity: async (parent: any) => {
      try {
        const matchingCharity = await charity.findByPk(parent.charity);
        return matchingCharity;
      } catch (error) {
        console.error(`Error fetching charity: ${error}`);
        throw new Error("Failed to fetch charity.");
      }
    },

    currency: async (parent: any) => {
      try {
        const matchingCurrency = await currency.findByPk(parent.currency);
        return matchingCurrency;
      } catch (error) {
        console.error(`Error fetching currency: ${error}`);
        throw new Error("Failed to fetch currency.");
      }
    },
  },
};
export default resolvers;
