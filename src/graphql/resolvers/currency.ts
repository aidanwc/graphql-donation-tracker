import { Currency, Context } from "../types/types";

const resolvers = {
  Query: {
    currencies: async (_: any, __: any, { pool }: Context) => {
      try {
        const { rows } = await pool.query("SELECT * FROM currency");
        return rows;
      } catch (error) {
        console.error(`Error fetching currencies: ${error}`);
        throw new Error("Failed to fetch currencies.");
      }
    },
  },
  Mutation: {
    createCurrency: async (
      _: any,
      { currency_code }: Currency,
      { pool }: Context
    ) => {
      try {
        const values = [currency_code];
        const { rows } = await pool.query(
          "INSERT INTO currency (currency_code) VALUES ($1) RETURNING *",
          values
        );
        return rows[0];
      } catch (error) {
        console.error(`Error creating currency: ${error}`);
        throw new Error("Failed to create currency");
      }
    },
  },
};

export default resolvers;
