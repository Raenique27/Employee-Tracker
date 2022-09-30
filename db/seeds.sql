INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3),
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Sofia', 'Lindell', 3, NULL),
('Devin', 'Turner', 4, 1),
('Lisa', 'Ensworth', 1, NULL),
('Danny', 'Withers', 2, 3),
('David', 'Silver', 5, NULL),
('Greg', 'Delano', 6, 5),
('Dearra', 'Williams', 7, NULL),
('Stacy', 'Paloma', 8, 7);
