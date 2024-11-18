const { DataTypes } = require("sequelize");
const sequelize = require("../core/orm");

const Task = sequelize.define("task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});
module.exports = Task;
 