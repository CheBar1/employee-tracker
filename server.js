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
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
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
    connection.query(query, function(err,res) {
      if (err) throw err;
      console.table(res);
      startSearch();
      })
    };

  // Function to display all roles 
  function byRole() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err,res) {
      if (err) throw err;
      console.table(res);
      startSearch();
      })
    };

  // Function to display all departments
  function byDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err,res) {
      if (err) throw err;
      console.table(res);
      startSearch();
      })
    };

  // Function to add an employee
  // function addEmployee()


  // Function to add a Department
  // function addDepartment() 
 
    

  // Function to add a role 
  // function addRole()   
  

  // Function to update an employee's role  
  // function updateRole()            
            
    



    // Default response for any other request (Not Found)
    app.use((req, res) => {
      res.status(404).end();
    });
    // Run server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });