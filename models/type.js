const { DataTypes } = require('sequelize');

const sequelize = require('../core/orm');

const Type = sequelize.define('type', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Type;