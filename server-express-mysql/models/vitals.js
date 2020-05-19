"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vitals = sequelize.define(
    "Vitals",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      //heartreate - Integer

      //temperature - Integer

      //o2levels - Integer

      name: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    },
    {}
  );
  Vitals.associate = function(models) {
    // associations can be defined here
  };
  return Vitals;
};
