/*import { Pool } from "pg";

const resolvers = {
  Query: {
    charities: async (_: any, __: any, { pool }: { pool: Pool }) => {
      const { rows } = await pool.query("SELECT * FROM charity");
      return rows;
    },
  },
  Mutation: {
    createCharity: async (
      _,
      {
        charity_name,
        description,
        address,
        url,
        email,
        phone_number,
      }: {
        charity_name: string;
        description?: string;
        address?: string;
        url?: string;
        email?: string;
        phone_number?: string;
      },
      { pool }: { pool: Pool }
    ) => {
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
    },
  },
};
*/
