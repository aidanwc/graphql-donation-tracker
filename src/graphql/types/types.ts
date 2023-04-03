import { Pool } from "pg";

export interface Context {
  pool: Pool;
}

export interface Currency {
  currency_code: String;
}
