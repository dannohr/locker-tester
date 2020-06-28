"use strict";
module.exports = (sequelize, DataTypes) => {
  const lockers = sequelize.define(
    "lockers",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

      lockerSystemId: DataTypes.INTEGER,
      cardNum: DataTypes.INTEGER,
      portNum: DataTypes.INTEGER,
      lockNum: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
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

  return lockers;
};
