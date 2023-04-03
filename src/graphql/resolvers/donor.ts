import { Context, Donor } from "../types/types";

const resolvers = {
  Query: {
    donors: async (_: any, __: any, { pool }: Context) => {
      try {
        const { rows } = await pool.query("SELECT * FROM donor");
        return rows;
      } catch (error) {
        console.error(`Error fetching donors: ${error}`);
        throw new Error("Failed to fetch donors.");
      }
    },
  },
  Mutation: {
    createDonor: async (
      _: any,
      { email, first_name, last_name, address }: Donor,
      { pool }: Context
    ) => {
      try {
        const values = [email, first_name, last_name, address];
        const { rows } = await pool.query(
          "INSERT INTO Donor (email, first_name, last_name, address) VALUES ($1, $2, $3, $4) RETURNING *",
          values
        );
        return rows[0];
      } catch (error) {
        console.error(`Error creating Donor: ${error}`);
        throw new Error("Failed to create Donor");
      }
    },
  },
};

export default resolvers;
