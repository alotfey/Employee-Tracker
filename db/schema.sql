CREATE TABLE department (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NULL
);


CREATE TABLE role (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,2) null,
  department_id INT null,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL  
);

CREATE TABLE employee (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  first_name  VARCHAR(30) NULL,
  last_name  VARCHAR(30) NULL, 
  role_id  INT NULL,
  manager_id INT NULL ,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,  
  CONSTRAINT fk_employee FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL  

);
