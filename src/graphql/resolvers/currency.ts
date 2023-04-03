import { Currency, Context } from "../types/types";

export const resolver = {
  Query: {
    currencies: async (_: any, __: any, { pool }: Context) => {
      const { rows } = await pool.query("SELECT * FROM currency");
      return rows;
    },
  },
  Mutation: {
    createCurrency: async (
      _: any,
      { currency_code }: Currency,
      { pool }: Context
    ) => {
      const values = [currency_code];
      const { rows } = await pool.query(
        "INSERT INTO currency (currency_code) VALUES ($1) RETURNING *",
        values
      );
      return rows[0];
    },
  },
};
