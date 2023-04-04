import {
  currency,
  currencyCreationAttributes,
} from "../../db/models/init-models";

const resolvers = {
  Query: {
    currencies: async () => {
      try {
        const currencies = await currency.findAll();
        return currencies;
      } catch (error) {
        console.error(`Error fetching currencies: ${error}`);
        throw new Error("Failed to fetch currencies.");
      }
    },
  },
  Mutation: {
    createCurrency: async (_: any, attr: currencyCreationAttributes) => {
      try {
        const newCurrency = await currency.create(attr);
        return newCurrency;
      } catch (error) {
        console.error(`Error creating currency: ${error}`);
        throw new Error("Failed to create currency");
      }
    },
  },
};

export default resolvers;
