import { Donation, Context } from "../types";

const resolvers = {
  Query: {
    donations: async (_: any, __: any, { pool }: Context) => {
      try {
        const { rows } = await pool.query("SELECT * FROM donation");
        return rows;
      } catch (error) {
        console.error(`Error fetching donations: ${error}`);
        throw new Error("Failed to fetch donations.");
      }
    },
  },

  Mutation: {
    createDonation: async (
      _: any,
      { donor_id, charity_id, amount, currency_code, donated_on }: Donation,
      { pool }: Context
    ) => {
      try {
        const query =
          "INSERT INTO donation (donor, charity, amount, currency, donated_on) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [
          donor_id,
          charity_id,
          amount,
          currency_code,
          donated_on || new Date(),
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
      } catch (error) {
        console.error(`Error creating donation: ${error}`);
        throw new Error("Failed to create donation.");
      }
    },
  },

  Donation: {
    donor: async (parent: any, _: any, { pool }: Context) => {
      try {
        const { rows } = await pool.query("SELECT * FROM donor WHERE id = $1", [
          parent.donor,
        ]);
        return rows[0];
      } catch (error) {
        console.error(`Error fetching donor: ${error}`);
        throw new Error("Failed to fetch donor.");
      }
    },

    charity: async (parent: any, _: any, { pool }: Context) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM charity WHERE id = $1",
          [parent.charity]
        );
        return rows[0];
      } catch (error) {
        console.error(`Error fetching charity: ${error}`);
        throw new Error("Failed to fetch charity.");
      }
    },

    currency: async (parent: any, _: any, { pool }: Context) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM currency WHERE currency_code = $1",
          [parent.currency]
        );
        return rows[0];
      } catch (error) {
        console.error(`Error fetching currency: ${error}`);
        throw new Error("Failed to fetch currency.");
      }
    },
  },
};
export default resolvers;
