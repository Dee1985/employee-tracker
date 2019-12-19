  // Dependencies
const connection = require("./db/db.js");
const inquirer = require("inquirer");
const cTable = require("console.table")

function startQ() {

    function firstQ() {

    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Role'],
        name: "choices"
    })

    }
};
startQ();