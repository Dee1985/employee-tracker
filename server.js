  // Dependencies
const connection = require("./db/db.js");
const cTable = require("console.table")
const inquirer = require('inquirer');

// ====================================================================================================================
// Inquirer prompt and promise
function askQ(){
  inquirer
  .prompt({
    type: 'list',
    name:'startQ',
    message: 'What would you like to do?',
    choices: [
      'view all employees',
      'view all department',
      'view all roles',
      'add employee',
      'remove employe',
      'update employee role',
      'update employee manager',    
    ]
  }).then (function(answer){
    console.log(answer)
    // start of switch statment for user choice
    switch (answer.startQ) {
      case "view all employees":
        viewallemployees() 
        break;
      
      case "view all roles":
        viewallroles()  
        break;

      case "view all departments":
        viewalldepartments()
        break;   
    
      case "add employee":
        addEmployee()
        break;

      case "remove employee":
        removeEmployee()
        break;

      case "update employee role":
        updateEmpRole()
        break;

      case "update employee manager":
        updateEmpManager()
        break;        
    }
  });
}  
askQ();

// ==================================================================================================================
// functions and queryies for different user selections
function viewallemployees(){
  console.log("retrieving employees from db")
  // mysql command to retieve employee table
  connection.query("SELECT * FROM employee", function(err, data){
    console.log(data, err);
      askQ()
  })
}

function viewallroles(){
  console.log("retrieving roles from database")
  // mysql command to retrieve role table
  connection.query("SELECT * FROM role", function(err, data){
    console.table(data)
      askQ()
  })
}

function viewalldepartments(){
  console.log("retrieving departments from database")
  // mysql command to retrieve department table
  connection.query("SELECT * FROM department", function(err, data){
    console.log(data, err)
      askQ()
  })
}

function addEmployee(){
  console.log("enter employee name to add")
  // mysql command to add info to table
  connection.query("", function(err, data){
    console.log(data, err)
      askQ()
  })
}

function removeEmployee(){
  console.log("enter employee name to remove")
  // mysql command to delete info from a table by id
  connection.query("", function(err, data){
    console.log(data, err)
      askQ()
  })
}

function updateEmpRole(){
  console.log("select employee")
  // mysql command to alter table info by role_id
  connection.query("", function(err, data){
    console.log(data, err)
      askQ()
  })
}

function updateEmpManager(){
  console.log("select employee")
  // mysql command to alter table info by manager_id
  connection.query("", function(err, data){
    console.log(data, err)
      askQ()
  })
}