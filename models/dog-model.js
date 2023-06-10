const { DataTypes } = require('sequelize');
const db = require('../db')

const Dog = db.define('Dog', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tail_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Dog;