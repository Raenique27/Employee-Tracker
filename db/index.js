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
}
