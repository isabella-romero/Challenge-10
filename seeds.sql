INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('HR');

-- Inserting data into role table
INSERT INTO role (title, department ,salary) VALUES
('Software Engineer','Engineering' ,80000),
('Sales Manager', 'Sales' ,75000),
('HR Specialist','HR' ,90000),
('HR Compliance Analyst','HR' ,80000),
('HR Audit Coordinator','HR' ,80000);

-- Inserting data into employee table
INSERT INTO employee (first_name, last_name, title, department, salary, manager) VALUES
('Alice', 'Smith', 'HR Specialist' , 'HR', 90000, NULL), -- Alice is a manager with no manager
('Bob', 'Johnson', 'HR Compliance Analyst', 'HR', 80000,'Alice Smith'), -- Bob reports to Alice
('Charlie', 'Brown', 'Sales Manager', 'Sales', 75000, NULL), -- Charlie is a Sales Manager with no manager
('David', 'Williams', 'HR Audit Coordinator','HR', 80000, 'Alice Smith'); -- David reports to Alice (HR Specialist)

