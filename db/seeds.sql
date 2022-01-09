INSERT INTO department (name)
VALUES
('sales'),
('Engineering'),
('Finance'),
('legal');

INSERT INTO role (title,salary,department_id)
VALUES
('salesperson',150000,1),
('Lead Engineer',180000,2),
('account',190000,3),
('lawyer',200000,4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
('mike','Chan',1,NULL),
('ashly','rodriquez',2,NULL),
('malia','brown',3,NULL),
('Tom','Allen',4,NULL);