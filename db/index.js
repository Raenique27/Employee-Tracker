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
    createEmployee(employee) {
        return this.db.promise().query(
            "INSERT INTO employee SET ?",employee
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
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
        );
    }

    // Add a new role
    createRole(role) {
        return this.db.promise().query(
            "INSERT INTO role SET ?", role
        );
    }

    // Show all departments
    showAllDepartments() {
        return this.db.promise().query(
            "SELECT * FROM department;"
        );
    }

    // Add department
    createDepartment(department) {
        return this.db.promise().query(
            "INSERT INTO department SET ?", department
        );
    }

}

module.exports = new employeeDataBase(db);
