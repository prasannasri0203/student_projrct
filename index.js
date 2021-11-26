const express = require('express');
const app = express();
const studentRouter = require('./routes/student-router');
const bodyParser = require("body-parser");


//read the json data from API
app.use(express.json());
//API
app.use('/api/student', studentRouter);
//extended the request data from API
app.use(bodyParser.urlencoded({ extended:true }));
//validate the API middleware
app.use('*', function (req, res) {
  res.status(404).send({error: "This url is not defined."})
});

const port = process.env.PORT || 4010;
app.listen(port,()=>{
  console.log(`Listening on port ${port}...`)
});