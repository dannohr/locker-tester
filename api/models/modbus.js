"use strict";
module.exports = (sequelize, DataTypes) => {
  const modbus = sequelize.define(
    "modbus",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

      ip: DataTypes.TEXT,
      port: DataTypes.INTEGER,
      numcards: DataTypes.INTEGER,
      active: DataTypes.INTEGER,
    },
    {}
  );

  // Daily.associate = models => {
  //   // Company.hasMany(models.UserCompany, {});
  //   Daily.belongsToMany(models.User, {
  //     through: models.UserCompany
  //   });
  //   Daily.belongsTo(models.Address, {});
  // };

  return modbus;
};
