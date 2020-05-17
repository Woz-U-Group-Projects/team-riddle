'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "workouts", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-05-16T01:23:11.195Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "firstName": {
                    "type": Sequelize.STRING,
                    "field": "firstName"
                },
                "lastName": {
                    "type": Sequelize.STRING,
                    "field": "lastName"
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "workouts",
            {
                "workoutId": {
                    "type": Sequelize.INTEGER,
                    "field": "workoutId",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "allowNull": true,
                    "field": "userId"
                },
                "workoutStatus": {
                    "type": Sequelize.STRING,
                    "field": "workoutStatus"
                },
                "workoutName": {
                    "type": Sequelize.STRING,
                    "field": "workoutName"
                },
                "noOfSets": {
                    "type": Sequelize.INTEGER,
                    "field": "noOfSets"
                },
                "noOfReps": {
                    "type": Sequelize.INTEGER,
                    "field": "noOfReps"
                },
                "noOfWeights": {
                    "type": Sequelize.INTEGER,
                    "field": "noOfWeights"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt"
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt"
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted"
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
