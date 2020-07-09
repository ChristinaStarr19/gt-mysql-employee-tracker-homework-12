DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id  INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO department (name)
VALUES ("Administration"), ("Clerical"), ("Instructional Team"), ("Custodial Staff"),

INSERT INTO role (title, salary, department_id)
VALUES ("Principal", 90000.00, 1), ("Office Manager", 30000.00, 2), ("Teacher", 50000.00, 3), ("Custodian", 30000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jason", "Moffit", 1, 1), ("Sherri", "Jackson", 2, 1), ("Christina", "Starr", 3, 1), ("Drew", "Simmons", 4, 1);