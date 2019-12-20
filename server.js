// Dependencies
const connection = require("./db/db.js")
const inquirer = require('inquirer')
const cTable = require("console.table")
const mysql = require("mysql")

// ====================================================================================================================
// Inquirer prompt and promise
function askQ(){
  inquirer.prompt({
      type: "list",
      name: "startQ",
      message: "What would you like to do?",
      choices: [
        "view all employees",
        "view all roles",
        "view all departments",
        "add employee",
        "add department",
        "add role"
      ]
  }).then(function(answer) {
      console.log(answer);
      // start of switch statment for user choice
      switch (answer.startQ) {
        case "view all employees":
          viewallemployees();
          break;

        case "view all roles":
          viewallroles();
          break;

        case "view all departments":
          viewalldepartments();
          break;

        case "add employee":
          addEmployee();
          break;

        case "update employee role":
          updateEmpRole();
          break;

        case "add department":
          addDepartment();
          break;

        case "add role":
          addRole();
          break;
      }
    });
}  
askQ();


// ==================================================================================================================
// functions and queryies for different user selections
function viewalldepartments(){
  // mysql command to retieve employee table
    connection.query("SELECT * FROM department", function(err, result){
     
    console.log("retrieving departments from db");
    console.table(result);
    }) 
     
     askQ();
};

function viewallroles(){
 
  // mysql command to retrieve role table
    connection.query("SELECT * FROM role", function(err, answer){
      console.log("retrieving roles from database");
      console.table (answer);
       
    })
     askQ();
};

function viewallemployees(){
  console.log("retrieving employess from database")
  // mysql command to retrieve department table
  connection.query("SELECT * FROM employee", function(err,answer){
    console.table(answer)
      
  })
  askQ()
}

function addEmployee(){
  inquirer.prompt([
    {
        type: 'input',
        message: 'enter employee name', 
        name:'firstname',
    },
    {
        type: 'input',
        message: 'enter employee last name',
        name:'lastname',
        
    },  
]).then (function(answer){
  
    connection.query("INSERT INTO employee SET ?",
          {
         // column: value
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: (null),
            manager_id: (null)
          },
            function(err, answer){
              if (err) {
                throw (err)
             }
                console.table(answer);
                  
         });
      askQ();
    })

}

/**
  function updateEmpRole(){
    inquirer
      .prompt([
        {
          type: "list",
          name: "updaterole"
          message: "select employee to update role",
          choices: [
            "John Doe"
            "Daphne Moon"
          ]
        },
        {
          type: "input",
          message: "enter employee's new role",
          name: "newrole"
        }
      ])
      .then(function(answer) {
        connection.query(
          //UPDATE [table] SET [column] = '[updated-value]' WHERE [column] = [value];
          
          function(err, answer) {
            if (err) {
              throw (err);
            }
            console.table(answer);
            askQ();
          }
        );
      });  
  }
  
*/
function addDepartment(){
  inquirer.prompt(
    {
     type: "input",
     message: "enter department name",       
     name: "dept"              
    }
).then (function(answer){
    connection.query(
      "INSERT INTO department SET ?",
      {
        // column: value
        name: answer.dept //help from Paul Cheng
      },
      function(err, answer) {
        if (err) {
          throw err;
        }
      }
    ),
      console.table();
          askQ();     
    
     
}); 
        // Insert into department table
}
 
   function addRole() {
      inquirer.prompt([
        {
          type: "input",
          message: "enter employee title",       
          name: "addtitle"       
        },
        {
          type: "input",
          message: "enter employee salary",       
          name: "addsalary"              
        },      
        {
          type: "input",
          message: "enter employee department id",
          name: "addDepId"
        }
      ]).then(function(answer){ 
       
          connection.query("INSERT INTO role SET ?",
            {
           // column: value
              title: answer.addtitle,
              salary: answer.addsalary,
              department_id: answer.addDepId
            },
              function(err, answer){
                if (err) {
                  throw (err)
               }
                  console.table(answer)
                    
          })
          askQ()
      });            
      
   }
