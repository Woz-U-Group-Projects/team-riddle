"use strict";
module.exports = (sequelize, DataTypes) => {
    const workouts = sequelize.define(
        "workouts",
        {
            workoutId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: DataTypes.INTEGER,
            workoutStatus: DataTypes.STRING,
            workoutName: DataTypes.STRING,
            noOfSets: DataTypes.INTEGER,
            noOfReps: DataTypes.INTEGER,
            noOfWeights: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            Deleted: DataTypes.BOOLEAN,
        },
    );
    workouts.associate = function (models) {
        workouts.belongsTo(models.users, {
            foreignKey: "userId"
        });
    };
    return workouts;
};

