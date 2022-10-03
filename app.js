const {prompt} = require('inquirer');
const db = require('./db');
const consoleTable = require('console.table');
const { createDepartment, createRole, createEmployee, updateEmployeeRole, showAllDepartments, showAllEmployees } = require('./db');

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
            case "VIEW_DEPARTMENT":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllDepartments();
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