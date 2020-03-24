DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee
(
     id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(20),
    manager_ID INTEGER(20) NULL,
    PRIMARY KEY (id)

);

CREATE TABLE role
(
   id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,3) NULL,
    department_id INTEGER(20),
	PRIMARY KEY (id)
);

CREATE TABLE department
(
	id INTEGER NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
)