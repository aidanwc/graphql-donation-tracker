import { Sequelize } from "sequelize";
import config from "../config/config";

export const sequelize = new Sequelize({
  ...config,
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
});
