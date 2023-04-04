import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { charity, charityId } from "./charity";
import type { currency, currencyId } from "./currency";
import type { donor, donorId } from "./donor";

export interface donationAttributes {
  id: number;
  donor: string;
  charity: string;
  amount?: number;
  currency: string;
  donated_on?: string;
  created_at?: Date;
}

export type donationPk = "id";
export type donationId = donation[donationPk];
export type donationOptionalAttributes =
  | "id"
  | "amount"
  | "donated_on"
  | "created_at";
export type donationCreationAttributes = Optional<
  donationAttributes,
  donationOptionalAttributes
>;

export class donation
  extends Model<donationAttributes, donationCreationAttributes>
  implements donationAttributes
{
  id!: number;
  donor!: string;
  charity!: string;
  amount?: number;
  currency!: string;
  donated_on?: string;
  created_at?: Date;

  // donation belongsTo charity via charity
  charity_charity!: charity;
  getCharity_charity!: Sequelize.BelongsToGetAssociationMixin<charity>;
  setCharity_charity!: Sequelize.BelongsToSetAssociationMixin<
    charity,
    charityId
  >;
  createCharity_charity!: Sequelize.BelongsToCreateAssociationMixin<charity>;
  // donation belongsTo currency via currency
  currency_currency!: currency;
  getCurrency_currency!: Sequelize.BelongsToGetAssociationMixin<currency>;
  setCurrency_currency!: Sequelize.BelongsToSetAssociationMixin<
    currency,
    currencyId
  >;
  createCurrency_currency!: Sequelize.BelongsToCreateAssociationMixin<currency>;
  // donation belongsTo donor via donor
  donor_donor!: donor;
  getDonor_donor!: Sequelize.BelongsToGetAssociationMixin<donor>;
  setDonor_donor!: Sequelize.BelongsToSetAssociationMixin<donor, donorId>;
  createDonor_donor!: Sequelize.BelongsToCreateAssociationMixin<donor>;

  static initModel(sequelize: Sequelize.Sequelize): typeof donation {
    return donation.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        donor: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "donor",
            key: "id",
          },
        },
        charity: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "charity",
            key: "id",
          },
        },
        amount: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },
        currency: {
          type: DataTypes.CHAR(3),
          allowNull: false,
          references: {
            model: "currency",
            key: "currency_code",
          },
        },
        donated_on: {
          type: DataTypes.DATEONLY,
          allowNull: true,
          defaultValue: Sequelize.Sequelize.literal("CURRENT_DATE"),
        },
      },
      {
        sequelize,
        tableName: "donation",
        schema: "main",
        timestamps: true,
        updatedAt: false,
        createdAt: "created_at",
        indexes: [
          {
            name: "donation_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
