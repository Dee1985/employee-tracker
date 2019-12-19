DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee
(
  id INT(50) AUTO_INCREMENT PK,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFRENCES role(id)
  FOREIGN KEY (manager_id) REFRENCES role(id)
);

CREATE TABLE role
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (5,2),
  department_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFRENCES department(id)
);

CREATE TABLE department
(
  id INT(50) AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY(id),
);


/**
  department:
  
id - INT PRIMARY KEY
  
  name - VARCHAR(30) to hold department name
  
  
  
  role:
  id - INT PRIMARY KEY
  
  title -  VARCHAR(30) to hold role title
  
  salary -  DECIMAL to hold role salary
  
  department_id -  INT to hold reference to department role belongs to
  
  
  
  employee:
  id - INT PRIMARY KEY
  
  first_name - VARCHAR(30) to hold employee first name
  
  last_name - VARCHAR(30) to hold employee last name
  
  role_id - INT to hold reference to role employee has
  
  manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
*/