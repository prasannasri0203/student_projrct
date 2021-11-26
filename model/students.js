const { DataTypes } = require('sequelize');

//create a model for student table 
function model(sequelize) {

    const attributes = {
        name: { type: DataTypes.STRING, allowNull: true },
        rollno: { type: DataTypes.INTEGER, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: false },
        current_standard: { type: DataTypes.INTEGER, allowNull: true }
    };
   
    return sequelize.define('students', attributes);
}

module.exports = model;
