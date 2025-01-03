INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('HR');

-- Inserting data into role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Sales Manager', 75000, 2),
('HR Specialist', 60000, 3);

-- Inserting data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, NULL), -- Alice is a manager with no manager
('Bob', 'Johnson', 1, 1), -- Bob reports to Alice
('Charlie', 'Brown', 2, NULL), -- Charlie is a Sales Manager with no manager
('David', 'Williams', 3, 1); -- David reports to Alice (HR Specialist)