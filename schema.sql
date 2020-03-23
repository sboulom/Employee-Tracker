DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee
(

    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(20),
    manager_ID INTEGER(20)

);

CREATE TABLE role
(

    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,3) NULL,
    department_id INTEGER(20),

);

CREATE TABLE department
(
    dept_name VARCHAR (30) NOT NULL,
)