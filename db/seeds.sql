USE employee_trackerDB,

-- role_id INT FKto hold reference to role employee has
-- manager_id INT FK to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
INSERT INTO department (name)
VALUES 
    ("Management"),
    ("legal")
  
INSERT INTO role (title, salary, department_id)
VALUES 
    ("manager", 100000,1 ),
    ("employee", 150000,2)
   

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Daphne", "Moon",1,NULL),
    ("John", "Doe",2,3)

-- department_id INT FK to hold reference to department role belongs to
/*
Build a command-line application that at a minimum allows the user to:
    Add departments, roles, employees
    View departments, roles, employees
    Update employee roles
=============================================================================================================================================
Use the MySQL NPM package to connect to your MySQL database and perform queries.
Use InquirerJs NPM package to interact with the user via the command-line.
Use console.table to print MySQL rows to the console. There is a built-in version of console.table, but the NPM package 
    formats the data a little better for our purposes.
You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a 
    constructor function or a class be helpful for organizing these?

You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's 
    activities if you need a refresher on this.
=================================================================================================================================================    
Bonus points if you're able to:
    Update employee managers
    View employees by manager
    Delete departments, roles, and employees
    View the total utilized budget of a department -- ie the combined salaries of all employees in that department
*/