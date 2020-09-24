--Inserts go in here
USE employee_tracker;

/* Insert 3 Rows into your new table */
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("John","Doe", 1,1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant",100,1);

INSERT INTO department (name)
VALUES ("Accounting");





