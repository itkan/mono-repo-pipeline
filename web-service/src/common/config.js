const fs = require('fs');

if (fs.existsSync('../.env')) {
    // Load environment variables from .env file
    require('dotenv').config({path: '../.env'})
}

const envs = {
  employeeDatabaseUser : process.env.EMPLOYEE_DATABASE_USERNAME,
  employeeDatabasePassword : process.env.EMPLOYEE_DATABASE_PASSWORD,
  employeeDatabaseHost : process.env.EMPLOYEE_DATABASE_HOST,
  employeeDatabasePort : process.env.EMPLOYEE_DATABASE_PORT,
  employeeDatabaseName : process.env.EMPLOYEE_DATABASE_NAME,
};

// Log the environment variables (optional)
console.log(envs);
module.exports = envs;
