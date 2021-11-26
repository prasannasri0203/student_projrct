const { body,validationResult } = require('express-validator');


// student Registration validation
var studentRegistrationValidation = [
    body('name','Name is requied').not().isEmpty(),
    body('rollno','Rollno is requied').not().isEmpty(),
    body('email','Email is not valid').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    body('password','Password must be 6 or more characters ').isLength({ min: 6 }),
    body('current_standard','Current Standard is requied').not().isEmpty(),
    body('preview_remark').isArray(),
    body('preview_remark.*.standard','Standard is requied').not().isEmpty(),
    body('preview_remark.*.remark','Remark is requied').not().isEmpty(),
    body('preview_remark.*.percentage','Percentage is requied').not().isEmpty()
];

module.exports = studentRegistrationValidation;