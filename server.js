// Dependencies
const connection = require("./db/db.js");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

// ====================================================================================================================
// Inquirer prompt and promise
const askQ = function() {
  inquirer
    .prompt({
      type: "list",
      name: "startQ",
      message: "What would you like to do?",
      choices: [
        "view all employees",
        "view all roles",
        "view all departments",
        "add employee",
        "add department",
        "add role",
        "update employee role"
      ]
    })
    .then(function(answer) {
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
};
askQ();

// functions and queryies for different user selections
function viewalldepartments() {
  // mysql command to retieve employee table
  connection.query("SELECT * FROM department", function(err, answer) {
    console.log("retrieving departments from db", "\n");
    console.table(answer);
  });

  askQ();
}

function viewallroles() {
  // mysql command to retrieve role table
  connection.query("SELECT * FROM role", function(err, answer) {
    console.log("retrieving roles from database", "\n");
    console.table(answer);
  });
  askQ();
}

function viewallemployees() {
  console.log("retrieving employess from database");
  // mysql command to retrieve department table
  connection.query("SELECT * FROM employee", function(err, answer) {
    console.log("retrieving employees from database", "\n");
    console.table(answer);
  });
  askQ();
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "enter employee name",
        name: "firstname"
      },
      {
        type: "input",
        message: "enter employee last name",
        name: "lastname"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          // column: value
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: null,
          manager_id: null
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      askQ();
    });
}


function updateEmpRole(){
  let allemp = []
  connection.query("SELECT * FROM employee", function(err, answer) {
    // console.log("retrieving employees from database", "\n");
    // console.log(answer);
    for (let i = 0; i < answer.length; i++){
      let empstr = answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name
      allemp.push(empstr)
    }
    // console.log(allemp)
  
inquirer.prompt([
	{
		type: "list",
    name: "employeeToUpdate",
    message: "select employee to update role",
    choices: allemp
  },
	{
		type: "list",
    message: "select new role",
    choices:
    [
      "manager",
      "employee",
    ],
    name: "newrole"
  }
])
.then(function(answer) {
  console.log("about to update", answer)
  const idToUpdate = {}
  idToUpdate.employeeId = parseInt(answer.employeeToUpdate.split(" ")[0])
    if (answer.newrole === "manager"){
      idToUpdate.role_id = 1
    } else if (answer.newrole === "employee"){
      idToUpdate.role_id = 2
    }

	connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?", [idToUpdate.role_id, idToUpdate.employeeId], function(err, data) {
		askQ()	
    });
    });  
});
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "enter department name",
      name: "dept"
    })
    .then(function(answer) {
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
  inquirer
    .prompt([
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
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          // column: value
          title: answer.addtitle,
          salary: answer.addsalary,
          department_id: answer.addDepId
        },
        function(err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      askQ();
    });
}
