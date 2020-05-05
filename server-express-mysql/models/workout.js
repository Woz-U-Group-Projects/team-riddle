"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define(
    "Workout",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    },
    {}
  );
  Workout.associate = function(models) {
    // associations can be defined here
  };
  return Workout;
};
