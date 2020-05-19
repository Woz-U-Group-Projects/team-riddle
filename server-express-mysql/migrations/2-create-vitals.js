'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Vitals", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "create-vitals",
    "created": "2020-05-19T02:20:21.516Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Vitals",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true
            },
            "name": {
                "type": Sequelize.STRING,
                "field": "name"
            },
            "complete": {
                "type": Sequelize.BOOLEAN,
                "field": "complete"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

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
