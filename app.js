const {prompt} = require('inquirer');
const db = require('./db');
const cTable = require('console.table');

initlize();

function initlize() {
    startPrompt();
}

function startPrompt() {
    prompt([
        {
            // Main menu prompts to load on npm start
            type: "list",
            name: "choice",
            message: "What would you like to do ?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add a Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;

        // Call function based on what the user selects
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENT":
                createDepartment();
                break;
            case "ADD_ROLE":
                createRole();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    })
}

// Show all departments
function viewAllDepartments() {
    db.showAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments)
        })
        .then(() => startPrompt());
}

// Show all Employees
function viewAllEmployees() {
    db.showAllEmployees()
        .then (([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => startPrompt());
}

// Show all roles
function viewAllRoles() {
    db.showAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => startPrompt());
}

// Create a role
function createRole() {
    db.showAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary for the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role fall under?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => startPrompt())
                })
        })
}

// Create a department
function createDepartment() {
    prompt([
        {
            name: "name",
            message: "What is the name of the department"
        }
    ])
        .then(res => {
            let name = res;
            db.createDepartment(name)
                .then(() => console.log(`Added ${name.name} to the database`))
                .then(() => startPrompt())
        })
}

// Create an employee
function createEmployee() {
    prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        }, 
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
        
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.showAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is the employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            db.showAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name}) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null});

                                    prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Who's the employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.createEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added ${firstName} ${lastName} to the database`
                                        ))
                                        .then(() => startPrompt())
                                })
                        })
                })
        })
}

// Update employee role
function updateEmployeeRole() {
    db.showAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employee.map(({ id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.showAllRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Which role do you want to assign the selected employee?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("Updated employee's role"))
                                .then(() => startPrompt())
                        });
                });
        })
}

// Quit 
function quit() {
    process.exit();
}
