const bcrypt = require('bcryptjs');
const db = require('../db/db.js');
const { check,validationResult } = require('express-validator');
const configObj = require('../config/custom-environment-variables');
const jwt = require('jsonwebtoken');
var faker = require("faker");


//get all the  student data
async function getAll() {
 
        var studentsDetails = await db.Student.findAll({
            include: {
            model: db.studentMark,
            as: 'student_previous_standard_details'
         }
        });

        return {status:200,studentsDetails:studentsDetails};
}
//get previous student standart data
async function getById(id) {
    
    const getStudentMark = await db.studentMark.findAll({ where: { "student_id":id } });
    if (getStudentMark =='')
        return { status:400,msg:'Data not found' };
    
        return {status:200,getStudentMark:getStudentMark};
    
}
//login student
async function authenticate(req,res){
    
   const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        return res.json(errors);
    
    }else{

        var email = req.body.email;
        var password = req.body.password;

        const getStudent = await db.Student.findOne({ where: { email } });
        
        if (!getStudent || !(await bcrypt.compare(password,getStudent.password)))
        return {status:400,msg:'Username or password is incorrect'};

        // authentication successful
        const token = jwt.sign({id:getStudent.id},configObj.PrivateKey,{ expiresIn: '1000h' });
        return { status:200, msg: 'Logged in!',token,user: getStudent };
    }
}
//create faker data
async function addRamdomValue(req,res){

    for(let i=0;i<20000;i++){

       var email = faker.internet.email();
       var firstName = faker.name.findName(); 
       var lastName = faker.name.findName(); 

       var fakersData = {first_name:firstName,last_name:lastName,email:email};
       const fakerModel = new db.fakerModel(fakersData);
       fakerModel.save();
    }

    return { status:200,msg: 'faker data inserted...' };
}
//get faker data
async function getRandomValue(){

    const getfakerDatas = await db.fakerModel.findAll();
    if (getfakerDatas =='')
        return { status:400,msg:'Data not found' };
    
        return {status:200,getfakerDatas:getfakerDatas};

}

//create new student
async function create(req,res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(errors);
    }else{
        // validate
        if (await db.Student.findOne({ where: { email: req.body.email } })) {

            return {status:400,msg:req.body.email+' '+'EmailId is already registered'};
        }

        const Student = new db.Student(req.body);
        // hash password
        Student.password = await bcrypt.hash(req.body.password, 10);
        //save student
        insertedStudent = await Student.save();
        
        var studentRemark = req.body.preview_remark;

        if(insertedStudent.id !='' && studentRemark !=''){

            studentRemark.forEach(function(element) {
            
                studentRemarkValue = {
                    "student_id":insertedStudent.id,
                    "standard":element.standard,
                    "remark":element.remark,
                    "percentage":element.percentage
                };
                const insertedstudentMark = new db.studentMark(studentRemarkValue);
                insertedstudentMark.save();
            });
            return {status:200,msg:'Registered successfullly...'};

        }else{
            return {status:400,msg:'Something went Wrong'};
        }
    }
}


module.exports = {
    getAll,
    getById,
    create,
    authenticate,
    addRamdomValue,
    getRandomValue
};
