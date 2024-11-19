const sequelize = require('../core/orm');
const type = require('./type');
const task = require('./task');


task.hasOne(type);
type.hasMany(task);

sequelize.sync({ alter: true });

module.exports = {
    type,
    task,
};