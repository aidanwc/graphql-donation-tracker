import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { donation, donationId } from "./donation";

export interface donorAttributes {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  created_at?: Date;
}

export type donorPk = "id";
export type donorId = donor[donorPk];
export type donorOptionalAttributes =
  | "id"
  | "first_name"
  | "last_name"
  | "address"
  | "created_at";
export type donorCreationAttributes = Optional<
  donorAttributes,
  donorOptionalAttributes
>;

export class donor
  extends Model<donorAttributes, donorCreationAttributes>
  implements donorAttributes
{
  id!: string;
  email!: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  created_at?: Date;

  // donor hasMany donation via donor
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

  static initModel(sequelize: Sequelize.Sequelize): typeof donor {
    return donor.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: "donor_email_key",
        },
        first_name: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        last_name: {
          type: DataTypes.STRING(64),
          allowNull: true,
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "donor",
        schema: "main",
        timestamps: true,
        updatedAt: false,
        createdAt: "created_at",
        indexes: [
          {
            name: "donor_email_key",
            unique: true,
            fields: [{ name: "email" }],
          },
          {
            name: "donor_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
