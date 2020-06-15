"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Interval", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meterDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      start: {
        allowNull: false,
        type: Sequelize.STRING
      },
      end: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startDateTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      consumption: {
        allowNull: false,
        type: Sequelize.DECIMAL(8, 4)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Interval");
  }
};
