import inquirer from 'inquirer';
import { connectToDatabase, runQuery, closeConnection, client } from './db.js';
import { Database } from './Node.js';

const prompt = inquirer.createPromptModule();
let clientconnected = false;

async function showMenu() {
  const answer = await prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add an Employee',
        'Update an Employee Role',
        'View All Roles',
        'Add a Role',
        'View All Departments',
        'Add a Department',
        'Quit'
      ]
    }
  ]);

  console.log("User selected:", answer.action);

  if (!clientconnected) {
    console.log("Connecting to database...");
    await connectToDatabase(); 
    clientconnected = true;
  }

  try {
    switch (answer.action) {
      case 'View All Departments':
        console.log("Viewing all departments...");
        const departments = await runQuery('SELECT id, name FROM department');
        console.table(departments); 
        break;

      case 'Add an Employee':
        console.log("Add an employee ");
    
        const newFirstname = await prompt([
          {
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name?"
          }
        ]);
    
        const newLastname = await prompt([
          {
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name?"
          }
        ]);
    
        const rolesread = await runQuery('SELECT id, title FROM role');
        const roleschoices = rolesread.map(role => ({
          name: role.title,
          value: role.id    
        }));        
    
        const rolesanswer = await prompt([
          {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleschoices
          }
        ]);
    
        const managerread = await runQuery('SELECT id, first_name, last_name FROM employee');
        const managerchoice = managerread.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id    
        }));        
  
    
        const manageranswer = await prompt([
          {
            type: 'list',
            name: 'managername',
            message: "Who is the employee's manager?",
            choices: managerchoice
          }
        ]);
    
        console.log("rolesanswer.role" , rolesanswer.role)
        const selectedRole = await runQuery(
          'SELECT id, title,department,salary FROM role WHERE id = $1',[rolesanswer.role]);        
        const roleId = selectedRole[0].id;
        const department = selectedRole[0].department;
        const salary = selectedRole[0].salary;
    
        let managerName = '';
        if (manageranswer.managername) {
          const selectedManager = await runQuery('SELECT first_name, last_name FROM employee WHERE id = $1', [manageranswer.managername]);
          managerName = `${selectedManager[0].first_name} ${selectedManager[0].last_name}`;
        } else {
          managerName = 'None';  
        }
  
        console.log("First name: ", newFirstname.firstname, "Last name: ", newLastname.lastname, "Role selected: ", roleId, "Department: ", department, "Salary: ", salary, "Manager selected: ", managerName);
        const newEmployeeResult = await db.insertEmployee(
          newFirstname.firstname,
          newLastname.lastname,
          rolesanswer.role,  // role_id is correct
          manageranswer.managername  // manager_id is correct
        );
              

        console.log("New employee added: ", newEmployeeResult);
        break;

      case 'Update an Employee Role':
        console.log("Update an Employee Role");

        const employeesread = await runQuery('SELECT id, first_name, last_name FROM employee');
        const employeechoices = employeesread.map(employee => ({
          name: employee.first_name + ' ' +employee.last_name,
          value: employee.id    
        }));        
    
        const employeeanswer = await prompt([
          {
            type: 'list',
            name: 'name',
            message: "Which employee' role do you want to update?",
            choices: employeechoices
          }
        ]);
        console.log("employeeanswer.name ",employeeanswer.name)

        const rolesread_update = await runQuery('SELECT id, title FROM role');
        const roleschoices_update = rolesread_update.map(role => ({
          name: role.title,
          value: role.id    
        }));        
    
        const rolesanswer_update = await prompt([
          {
            type: 'list',
            name: 'role',
            message: "Which role do you want to assign the selected employee?",
            choices: roleschoices_update
          }
        ]);

        console.log("rolesanswer.role ", rolesanswer_update.role)
        const updatedEmployee = await db.updateEmployeeRole(employeeanswer.name, rolesanswer_update.role); 
    console.log(updatedEmployee);

        break;

      case 'View All Roles':
        console.log("Viewing all roles...");
        const roles = await runQuery('SELECT id, title, department, salary FROM role');
        console.table(roles); 
        break;

      case 'View All Employees':
    console.log("Viewing all employees...");

    // Use the query to fetch employee details with role, department, and manager
    const employees = await runQuery(
      `SELECT 
        e.id, 
        e.first_name, 
        e.last_name, 
        r.title AS title, 
        r.department AS department, 
        r.salary AS salary, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      JOIN role r ON e.role_id = r.id
      LEFT JOIN employee m ON e.manager_id = m.id;`
    );

    // Display the result as a table
    console.table(employees);
    break;


      case 'Add a Department':
        console.log("Adding a department...");
        const newDepartmentAnswer = await prompt([
          {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
          }
        ]);
        console.log("New Department: ", newDepartmentAnswer.departmentName);

        const newDepartment = await db.insertDepartment(newDepartmentAnswer.departmentName);
        console.log("Department added: ", newDepartment);
        break;

      case 'Add a Role':
        console.log("Adding a role...");
        const newRole = await prompt([
          {
            type: 'input',
            name: 'rolename',
            message: 'What is the name of the role?'
          }
        ]);

        const newSalary = await prompt([
          {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
          }
        ]);

        const departmentsRead = await runQuery('SELECT id, name FROM department');
        const departmentChoices = departmentsRead.map(department => ({
          name: department.name,
          value: department.name  
        }));        

        const departmentAnswer = await prompt([
          {
            type: 'list',
            name: 'department',
            message: 'What department does the role belong to?',
            choices: departmentChoices
          }
        ]);

        console.log("New role: ", newRole.rolename, "New salary: ", newSalary.salary, "Department: ", departmentAnswer.department);

        const newRoleResult = await db.insertRole(newRole.rolename, departmentAnswer.department, newSalary.salary);
        console.log("Role added: ", newRoleResult);
        break;

      case 'Quit':
        console.log('Goodbye!');
        await closeConnection(); 
        process.exit();
        break;

      default:
        console.log('Invalid choice!');
        break;
    }

  } catch (error) {
    console.error("Error occurred during operation:", error);
  } finally {
    if (answer.action !== 'Quit') {
      showMenu(); 
    }
  }
}

function main() {
  showMenu();
}

const db = new Database(client);
main();
