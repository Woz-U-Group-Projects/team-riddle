"use strict";
module.exports = (sequelize, DataTypes) => {
  const vitals = sequelize.define(
    "vitals",
    {
      vitalId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      heartRate: DataTypes.INTEGER,
      temperature: DataTypes.INTEGER,
      o2levels: DataTypes.INTEGER,
    },
  );
  vitals.associate = function(models) {
    vitals.belongsTo(models.users, {
      foreignKey: "userId"
    });
  };
  return vitals;
};
