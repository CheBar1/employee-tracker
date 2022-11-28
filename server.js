const express = require('express');

// Import and require inquirer
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
// Import and require dotenv to keep personal information secure
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employee_tracker database.`)
);
 
// Function for inquirer to prompt
startSearch();

// Inquirer prompt function
function startSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department"
      ]
    }).then(answers => {
      //starting switch statements
      switch (answers.action) {
        case "View All Employees":
          byEmployee();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          byRole();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          byDepartment();
          break;
        case "Add Department":
          addDepartment();
          break;
      }
    })
}

// Function to display all employees
function byEmployee() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startSearch();
  })
};

// Function to display all roles 
function byRole() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startSearch();
  })
};

// Function to display all departments
function byDepartment() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startSearch();
  })
};

// Function to add a Department
function addDepartment() {
  inquirer.prompt(
    {
      name: "dept_name",
      type: "input",
      message: "Which department would you like to add?"
    }).then((res) => {

      const query = `INSERT INTO department (dept_name)
    VALUES (?)`;
      const params = [res.dept_name];

      connection.query(query, params, (err, result) => {
        if (err) throw err;
        console.log("The department has been added.");
        startSearch();
      });
    })
};

// Function to add a role - This is not adding the departmen id, more work required
function addRole() {
//Build array of role choices
let departmentChoices = [];
let options = "SELECT dept_id as value, dept_name as name FROM department";

connection.query(options, function (err, res) {
  if (err) throw err;
  departmentChoices = JSON.parse(JSON.stringify(res));
  
  let questions = [
  {
      name: "title",
      type: "input",
      message: "Please enter the role's title."               
  },
  {
      name: "salary",
      type: "input",
      message: "Please enter the role's salary.",
  },
  {
      name: "dept_name",
      type: "list",
      message: "Which department does this new role belong to?",
      choices: departmentChoices
  }];

  inquirer.prompt(questions).then(res => {
    const outcome = "INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)";
    const params = [res.title, res.salary, res.dept_id];
    connection.query(outcome, params, (err, result) => {
        if (err) throw err;
        console.log("The role has been added.");
        startSearch();
    });
  });
});
};  

// Function to update an employee's role - Not yet completed
// function updateRole() {
//   inquirer
//     .prompt([
//       {
//         name: "emp_id",
//         type: "list",
//         message: "Which employee's role do you want to update?",
//         choices: ""
//       },
//       {
//         name: "role_id",
//         type: "list",
//         message: "Which role do you want to assign to the employee?",
//         choices: ""
//       }
//     ])
//     .then(function(answer) {
//       connection.query("UPDATE employee SET role_id = ? WHERE emp_id = ?", [answer.updateRole, answer.updateId], function(err, res) {
//           if (err) throw err;
//           console.log("Update of role successful!");
//           startSearch();
//         }
//       );
//     });
// }

// Function to add an employee - Not yet completed
// function addEmployee()

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
// Run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});