const express = require('express');
const app = express();

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
const connect = mysql.createConnection(
  {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
  },
  console.log(`Connected to the employee_tracker database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
