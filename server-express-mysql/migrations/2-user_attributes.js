'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "username" from table "users"
 * addColumn "userName" to table "users"
 * addColumn "weight" to table "users"
 * addColumn "height" to table "users"
 * addColumn "birthday" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "user_attributes",
    "created": "2020-05-20T23:14:09.902Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["users", "username"]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "userName",
            {
                "type": Sequelize.STRING,
                "field": "userName"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "weight",
            {
                "type": Sequelize.DECIMAL(4, 2),
                "field": "weight"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "height",
            {
                "type": Sequelize.INTEGER,
                "field": "height"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "birthday",
            {
                "type": Sequelize.DATE,
                "field": "birthday"
            }
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
