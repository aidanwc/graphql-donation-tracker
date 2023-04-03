import { Pool } from "pg";

export interface Context {
  pool: Pool;
}

export interface Currency {
  currency_code: String;
}

export interface Donor {
  email: String;
  first_name?: String;
  last_name?: String;
  address?: String;
}

export interface Charity {
  charity_name: String;
  description?: String;
  address?: String;
  url?: String;
  email?: String;
  phone_number?: String;
}

export interface Donation {
  donor_id: String;
  charity_id: String;
  amount: Number;
  currency_code: String;
  donated_on?: String;
}
