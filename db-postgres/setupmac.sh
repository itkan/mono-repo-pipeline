// install postgresql client
brew install postgresql

//connect to your remote or containerized instance
psql -h localhost -p 5432 -U postgres

// commands to run in psql

// list all database
\l

//connect to a database
\c employees

//list all tables
\dt

//create table
-- Create 'employee' table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255)
);

//insert a new record
INSERT INTO employees (first_name, last_name, email)
VALUES ('John', 'Doe', 'john.doe@example.com');

//view records
SELECT * FROM employees;

// view record by id
SELECT * FROM employees WHERE id = 1;

//update record
UPDATE employees
SET email = 'new.email@example.com'
WHERE id = 1;

//delete record
DELETE FROM employees WHERE id = 1;

// quit shell connection
\q