const { DataTypes } = require('sequelize');
const sequelize = require('../core/orm');
const bcrypt = require('bcrypt');
 
const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
        }
    },
    display_name: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
});
 
User.beforeCreate(async user => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});
 
User.beforeUpdate(async user => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});
 
User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};



module.exports = User;