const { DataTypes } = require('sequelize');

//create a model for student standard table
function model(sequelize) {
    const attributes = {
        student_id: { type: DataTypes.INTEGER, allowNull: false },
        standard: { type: DataTypes.INTEGER, allowNull: true },
        remark: { type: DataTypes.STRING, allowNull: true },
        percentage: { type: DataTypes.INTEGER, allowNull: true }
    };

    return sequelize.define('student_marks', attributes);
}
module.exports = model;
