DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  dept_id INTEGER AUTO_INCREMENT NOT NULL,  
  dept_name VARCHAR(100),
  PRIMARY KEY (dept_id) 
);

CREATE TABLE role (
  role_id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(9,2),
  dept_id INTEGER, 
  PRIMARY KEY (role_id),
  FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE employee (
  emp_id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (emp_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);