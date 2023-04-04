import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { donation, donationId } from './donation';

export interface currencyAttributes {
  currency_code: string;
}

export type currencyPk = "currency_code";
export type currencyId = currency[currencyPk];
export type currencyCreationAttributes = currencyAttributes;

export class currency extends Model<currencyAttributes, currencyCreationAttributes> implements currencyAttributes {
  currency_code!: string;

  // currency hasMany donation via currency
  donations!: donation[];
  getDonations!: Sequelize.HasManyGetAssociationsMixin<donation>;
  setDonations!: Sequelize.HasManySetAssociationsMixin<donation, donationId>;
  addDonation!: Sequelize.HasManyAddAssociationMixin<donation, donationId>;
  addDonations!: Sequelize.HasManyAddAssociationsMixin<donation, donationId>;
  createDonation!: Sequelize.HasManyCreateAssociationMixin<donation>;
  removeDonation!: Sequelize.HasManyRemoveAssociationMixin<donation, donationId>;
  removeDonations!: Sequelize.HasManyRemoveAssociationsMixin<donation, donationId>;
  hasDonation!: Sequelize.HasManyHasAssociationMixin<donation, donationId>;
  hasDonations!: Sequelize.HasManyHasAssociationsMixin<donation, donationId>;
  countDonations!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof currency {
    return currency.init({
    currency_code: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'currency',
    schema: 'main',
    timestamps: false,
    indexes: [
      {
        name: "currency_pkey",
        unique: true,
        fields: [
          { name: "currency_code" },
        ]
      },
    ]
  });
  }
}
