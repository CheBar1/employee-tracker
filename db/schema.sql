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
  /*We use ON DELETE CASCADE for the department_id so that if a department is deleted, so will the role.*/
  FOREIGN KEY (dept_id) REFERENCES department(dept_id) ON DELETE CASCADE
);

CREATE TABLE employee (
  emp_id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (emp_id),
  /*We use ON DELETE CASCADE for the role_id which means if the role gets deleted, the delete will cascade and delete any employees with that role.*/
  FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE,
  /*We use ON DELETE SET NULL for the manager_id which means if the manager of an employee gets deleted, allow the manager_id column for that employee to be set to null. */
  FOREIGN KEY (manager_id) REFERENCES employee(emp_id) ON DELETE SET NULL
);