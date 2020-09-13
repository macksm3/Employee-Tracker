
INSERT INTO departments (dept_name) VALUES ('Sales');
INSERT INTO departments (dept_name) VALUES ('Finance');
INSERT INTO departments (dept_name) VALUES ('Legal');

INSERT INTO role (title, salery, department_id) VALUES ('Sales Lead', 100000, 1);
INSERT INTO role (title, salery, department_id) VALUES ('Account', 125000, 2);
INSERT INTO role (title, salery, department_id) VALUES ('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('George', 'Washington', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Alexander', 'Hamilton', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('James', 'Madison', 3);

