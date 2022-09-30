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

}
