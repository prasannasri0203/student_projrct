const { DataTypes } = require('sequelize');

//create a model for faker table 
function model(sequelize) {

    const attributes = {
        first_name: { type: DataTypes.STRING, allowNull: true },
        last_name: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
    };
   
    return sequelize.define('faker_data', attributes);
}

module.exports = model;
