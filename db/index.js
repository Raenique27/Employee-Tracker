const db = require("./connection");

class employeeDataBase {
    constructor(db) {
        this.db = db;
    }

    // Shows all employees
    showAllEmployees() {
        return this.db.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id;"
        );
    }

    // Add an employee
    createEmployee(firstName, lastName, role, manager) {
        return this.db.promise().query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);",
            [firstName, lastName, role, manager]
        );
    }

    // Update employee role
    updateEmployeeRole(roleId, employeeId) {
        return this.db.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    // Show all roles
    showAllRoles() {
        return this.db.promise().query(
            "SELECT role.id, role.title, role.salary, department.name, role.department_id FROM role LEFT JOIN department ON role.department_id = department.id;"
        );
    }

    // Add a new role
    createRole(title, salary, department_id) {
        return this.db.promise().query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
            [title,salary,department_id]
        );
    }

    // Show all departments
    showAllDepartments() {
        return this.db.promise().query(
            "SELECT * FROM department;"
        );
    }

    // Add department
    createDepartment(name) {
        return this.db.promise().query(
            "INSERT INTO department (name) VALUES (?);", name
        );
    }

}
