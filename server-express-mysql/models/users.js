const bcrypt = require("bcryptjs");

("use strict");
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            userName: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            weight: DataTypes.DECIMAL(4,2),
            height: DataTypes.INTEGER,
            birthday: DataTypes.DATE,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },

    );
    users.prototype.comparePassword = function (plainTextPassword) {
        let user = this;
        console.log('users/models comparePassword');
        return bcrypt.compareSync(plainTextPassword, user.password);
    };

    users.associate = function (models) {
        users.hasMany(models.workouts, {
            foreignKey: 'userId'
        });
    };

    return users;
};


