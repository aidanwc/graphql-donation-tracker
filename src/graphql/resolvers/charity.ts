import { Charity, Context } from "../types";

const resolvers = {
  Query: {
    charities: async (_: any, __: any, { pool }: Context) => {
      try {
        const { rows } = await pool.query("SELECT * FROM charity");
        return rows;
      } catch (error) {
        console.error(`Error fetching charities: ${error}`);
        throw new Error("Failed to fetch charities.");
      }
    },
  },
  Mutation: {
    createCharity: async (
      _: any,
      { charity_name, description, address, url, email, phone_number }: Charity,
      { pool }: Context
    ) => {
      try {
        const values = [
          charity_name,
          description,
          address,
          url,
          email,
          phone_number,
        ];
        const { rows } = await pool.query(
          "INSERT INTO charity (charity_name, description, address, url, email, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          values
        );
        return rows[0];
      } catch (error) {
        console.error(`Error creating charity: ${error}`);
        throw new Error("Failed to create charity");
      }
    },
  },
};
export default resolvers;
