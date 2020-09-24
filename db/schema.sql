-- This is to make the database and mysql table here with 3 tables:
DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
roles_id INT NOT NULL,
manager_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (roles_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE roles(
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30),
PRIMARY KEY (id)
);