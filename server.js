  // Dependencies
const connection = require("./db/db.js");
const cTable = require("console.table")
const inquirer = require('inquirer');

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
      // 'add employee',
      // 'remove employe',
      // 'update employee role',
      // 'update employee manager',    
    ]
  }).then (function(answer){
    console.log(answer)
    switch (answer.startQ) {
      case "view all employees":
        viewallemployees()  
        break;
      
      case "view all roles":
        viewallroles()  
        break;
    
      default:
        break;
    }
  });
}  
askQ();

function viewallemployees(){
  console.log("grab employees from db")
  connection.query("SELECT * FROM employee", function(err, data){
    console.log(data, err)
    askQ()
  })
}

function viewallroles(){
  console.log("grab roles from db")
}