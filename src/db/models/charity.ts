import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { donation, donationId } from "./donation";

export interface charityAttributes {
  id: string;
  charity_name: string;
  address?: string;
  url?: string;
  email?: string;
  phone_number?: string;
  created_at?: Date;
  description?: string;
}

export type charityPk = "id";
export type charityId = charity[charityPk];
export type charityOptionalAttributes =
  | "id"
  | "address"
  | "url"
  | "email"
  | "phone_number"
  | "created_at"
  | "description";
export type charityCreationAttributes = Optional<
  charityAttributes,
  charityOptionalAttributes
>;

export class charity
  extends Model<charityAttributes, charityCreationAttributes>
  implements charityAttributes
{
  id!: string;
  charity_name!: string;
  address?: string;
  url?: string;
  email?: string;
  phone_number?: string;
  created_at?: Date;
  description?: string;

  // charity hasMany donation via charity
  donations!: donation[];
  getDonations!: Sequelize.HasManyGetAssociationsMixin<donation>;
  setDonations!: Sequelize.HasManySetAssociationsMixin<donation, donationId>;
  addDonation!: Sequelize.HasManyAddAssociationMixin<donation, donationId>;
  addDonations!: Sequelize.HasManyAddAssociationsMixin<donation, donationId>;
  createDonation!: Sequelize.HasManyCreateAssociationMixin<donation>;
  removeDonation!: Sequelize.HasManyRemoveAssociationMixin<
    donation,
    donationId
  >;
  removeDonations!: Sequelize.HasManyRemoveAssociationsMixin<
    donation,
    donationId
  >;
  hasDonation!: Sequelize.HasManyHasAssociationMixin<donation, donationId>;
  hasDonations!: Sequelize.HasManyHasAssociationsMixin<donation, donationId>;
  countDonations!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof charity {
    return charity.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        charity_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: "charity_charity_name_key",
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        url: {
          type: DataTypes.STRING(512),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        phone_number: {
          type: DataTypes.STRING(15),
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "charity",
        schema: "main",
        timestamps: true,
        updatedAt: false,
        createdAt: "created_at",
        indexes: [
          {
            name: "charity_charity_name_key",
            unique: true,
            fields: [{ name: "charity_name" }],
          },
          {
            name: "charity_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
