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

## Requirements

- Node.js
- A relational database (e.g., PostgreSQL) set up with the relevant tables (`department`, `role`, `employee`).
- Install required dependencies:

  ```bash
  npm install