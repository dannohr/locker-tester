"use strict";
module.exports = (sequelize, DataTypes) => {
  const lockerSystem = sequelize.define(
    "lockerSystem",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },

      systemName: DataTypes.TEXT,
      description: DataTypes.TEXT,
      numOfCards: DataTypes.INTEGER,
      numOfColumns: DataTypes.INTEGER,
      numOfDoors: DataTypes.INTEGER,
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

  return lockerSystem;
};
