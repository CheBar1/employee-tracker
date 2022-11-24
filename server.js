const express = require('express');
const app = express();

const inquirer = require('inquirer');
const fs = require('fs');

// Import and require mysql2
const mysql = require('mysql2');
// Import and require dotenv to keep personal information secure
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
  },
  console.log(`Connected to the employee_tracker database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//function for inquirer to prompt
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
            "Add Department",
            "Quit"
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
          case "Quit":
            connection.end();
            break; 
        }
      })
    }

    function byEmployee() {
      let query = "SELECT * FROM Employee";
      connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        startSearch();
      })
    };

    //function addEmployee



    //function updateRole

    function byRole() {
      let query = "SELECT * FROM Role";
      connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        startSearch();
      })
    };

    //function addRole

    function byDepartment() {
      let query = "SELECT * FROM Department";
      connection.query(query, function(err,res) {
        if (err) throw err;
        console.table(res);
        startSearch();
      })
    };

    //function addDepartment