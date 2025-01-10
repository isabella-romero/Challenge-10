CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create role table with reference to department
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL
);

-- Create employee table with references to role and manager (self-referencing)
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE VIEW employee_full_details AS
SELECT 
  e.id, 
  e.first_name, 
  e.last_name, 
  r.title AS title, 
  r.department AS department, 
  r.salary AS salary, 
  CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role r ON e.role_id = r.id
LEFT JOIN employee m ON e.manager_id = m.id;
