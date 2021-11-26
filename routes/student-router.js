const express = require('express');
var router = express();
const { body,validationResult } = require('express-validator');
const db  = require('../db/db.js');
const authenticateToken  = require('../middleware/jwt-token-middleware');
const studentCtrl = require('../controller/student-ctrl');
const studentRegistrationValidation = require('../validation/student-registration-validation');
const studentLoginValidation = require('../validation/student-login-validation');

//create student
router.post('/add',studentRegistrationValidation,studentCtrl.create);
//login
router.post('/authenticate',studentLoginValidation,studentCtrl.authenticate);
//get preview standard details route
router.get('/preview_standard_details/:id',authenticateToken,studentCtrl.getById);
//get all student details route
router.get('/get_all_student_details',authenticateToken,studentCtrl.getAll);
//create fakers data route
router.get('/add_random',authenticateToken,studentCtrl.addRamdomValue);
//get fakers data route
router.get('/get_random',authenticateToken,studentCtrl.getRandomValue);

module.exports = router;