const studentService = require('../service/student-service');

//student login
function authenticate(req, res, next) {
    studentService.authenticate(req,res)
        .then(getStudents => res.json(getStudents))
        .catch(next);
}
//get all the student data
function getAll(req, res, next) {
    studentService.getAll()
        .then(studentsDetails => res.json(studentsDetails))
        .catch(next);
}
//get previous student standart details
function getById(req, res, next) {
    studentService.getById(req.params.id)
        .then(getStudentMark => res.json(getStudentMark))
        .catch(next);
}
//create the new student 
function create(req, res, next) {
   
    studentService.create(req,res)
        .then((insertStudent) => res.json(insertStudent))
        .catch(next);
}
//create faker data
function addRamdomValue(req,res,next) {
   
    studentService.addRamdomValue(req,res)
        .then((insertStudent) => res.json(insertStudent))
        .catch(next);
}
//get faker data
function getRandomValue(req,res,next) {
   
    studentService.getRandomValue(req,res)
        .then((insertStudent) => res.json(insertStudent))
        .catch(next);
}

module.exports = {
    create,
    authenticate,
    getById,
    getAll,
    addRamdomValue,
    getRandomValue
};
