'use strict';
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        id: {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
        },
        name: DataTypes.STRING,
        emailid: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Users;
};
