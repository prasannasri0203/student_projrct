const configObj = require('../config/custom-environment-variables');
const students = require('../model/students');
const studentMark = require('../model/student-mark');
const fakerModel = require('../model/faker-model');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = configObj.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Student = students(sequelize);
    db.studentMark = studentMark(sequelize);
    db.fakerModel = fakerModel(sequelize);

    db.Student.hasMany(db.studentMark, { foreignKey:"student_id",as: "student_previous_standard_details" });

    // sync all models with database
    await sequelize.sync({ alter: true });
}
