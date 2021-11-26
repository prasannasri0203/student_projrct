const { body,validationResult } = require('express-validator');

//student login validation
const studentLoginValidation = [
    body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    body('password', 'Password is Required').not().isEmpty()
]

module.exports = studentLoginValidation;