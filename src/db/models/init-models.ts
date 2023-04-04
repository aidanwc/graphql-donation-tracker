import type { Sequelize } from "sequelize";
import { charity as _charity } from "./charity";
import type { charityAttributes, charityCreationAttributes } from "./charity";
import { currency as _currency } from "./currency";
import type { currencyAttributes, currencyCreationAttributes } from "./currency";
import { donation as _donation } from "./donation";
import type { donationAttributes, donationCreationAttributes } from "./donation";
import { donor as _donor } from "./donor";
import type { donorAttributes, donorCreationAttributes } from "./donor";

export {
  _charity as charity,
  _currency as currency,
  _donation as donation,
  _donor as donor,
};

export type {
  charityAttributes,
  charityCreationAttributes,
  currencyAttributes,
  currencyCreationAttributes,
  donationAttributes,
  donationCreationAttributes,
  donorAttributes,
  donorCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const charity = _charity.initModel(sequelize);
  const currency = _currency.initModel(sequelize);
  const donation = _donation.initModel(sequelize);
  const donor = _donor.initModel(sequelize);

  donation.belongsTo(charity, { as: "charity_charity", foreignKey: "charity"});
  charity.hasMany(donation, { as: "donations", foreignKey: "charity"});
  donation.belongsTo(currency, { as: "currency_currency", foreignKey: "currency"});
  currency.hasMany(donation, { as: "donations", foreignKey: "currency"});
  donation.belongsTo(donor, { as: "donor_donor", foreignKey: "donor"});
  donor.hasMany(donation, { as: "donations", foreignKey: "donor"});

  return {
    charity: charity,
    currency: currency,
    donation: donation,
    donor: donor,
  };
}
