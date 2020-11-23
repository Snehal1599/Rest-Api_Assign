const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const Response = require("./response");

app.use(bodyparser.json());

this.response = new Response();

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Snehal@06',
    database: 'employeedb',
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log("DB Connection Successful");
    else
        console.log("DB Connection Failed \n Error : " + JSON.stringify(err, undefined, 2));
});

//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        let returnValue = "";
        let self = this;
        if(!err){
            returnValue = self.response.success(rows);
            res.send(returnValue);
        }else
            console.log(err);
    })
});


//Get an employee
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE ID = ?',[req.params.id],(err, rows, fields)=>{
        let returnValue = "";
        let self = this;
        if(!err){
            returnValue = self.response.success(rows);
            res.send(returnValue);
        }else
            console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE ID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('True');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/addemployee', (req, res) => {
    let emp = req.body;
    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL EmployeeAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [emp.ID, emp.FIRSTNAME, emp.LASTNAME, emp.ADDRESS,emp.ORGNAME, emp.SALARY], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/updateemployee', (req, res) => {
    let emp = req.body;
    var sql = "SET @ID = ?;SET @FIRSTNAME = ?;SET @LASTNAME = ?;SET @ADDRESS = ?; SET @ORGNAME = ?; SET @SALARY = ?; \
    CALL EmployeeAddOrEdit(@ID,@FIRSTNAME,@LASTNAME,@ADDRESS,@ORGNAME,@SALARY);";
    mysqlConnection.query(sql, [emp.ID, emp.FIRSTNAME, emp.LASTNAME, emp.ADDRESS,emp.ORGNAME, emp.SALARY], (err, rows, fields) => {
        if (!err)
        res.send('Updated successfully');
        
        else
            console.log(err);
    })
});

app.listen(3000, () => {
    console.log('Express server is running at http://localhost:3000');
});






