# Command-Line Employee Management Application

This is a command-line application designed to manage employee information. It allows you to interact with a database to view, add, and update records for departments, roles, and employees.

## Features

- **View All Departments**: Displays a table with the department names and IDs.
- **View All Roles**: Displays job titles, role IDs, the department that each role belongs to, and the corresponding salary.
- **View All Employees**: Shows a formatted table with employee data including IDs, first names, last names, job titles, departments, salaries, and managers.
- **Add a Department**: Prompts the user to enter the name of a new department, which will be added to the database.
- **Add a Role**: Prompts the user to input the name, salary, and department for a new role and adds the role to the database.
- **Add an Employee**: Prompts the user to input an employee's first name, last name, role, and manager, then adds the employee to the database.
- **Update an Employee Role**: Allows the user to select an employee and assign a new role.
- 
## Acceptance Criteria

- **GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Video walkthrough of application
https://app.screencastify.com/v2/manage/videos/NSd8sxtd3JeNtZ40Vz0H
## Requirements

- Node.js
- A relational database (e.g., PostgreSQL) set up with the relevant tables (`department`, `role`, `employee`).
- Install required dependencies:

  ```bash
  npm install
