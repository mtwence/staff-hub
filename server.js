// Require npm pacages 
const mysql = require("mysql2");
const cT = require("console.table");
const inquirer = require("inquirer");

// connect to sql db 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
});

const questions = {
    name: "questions",
    message: "What would you like to do?",
    type: "list",
    choices: [
        "View All Departments",
        "Add Department",
        "View All Roles",
        "Add Role",
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "Quit",
    ],
};

const init = () => {
    inquirer.prompt(questions).then((answers) => {
        if (answers.questions === "View all Employees") { getEmployees()};
        if (answers.questions === "Add Employee") { addEmployee()};
        if (answers.questions === "View all Roles") { getRoles()};
        if (answers.questions === "Add Role") { addRole()} ;
        if (answers.questions === "View all Departments") { getDepartments()};
        if (answers.questions === "Add Department") { addDepartment() } ;
        if (answers.questions === "Update Employee Role") { updateEmployeeRole()};
        if (answers.questions === "Quit") { console.log("Goodbye!") };
    });
};

// Employees 
const getEmployees = async () => {
    let data = await db.promise().query('SELECT * from employees');
    console.table(data[0]);
    init();
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter your new employee's first name.",
                name: "first_name"
            },
            {
                type: "input",
                message: "Enter your new employee's last name.",
                name: "last_name"
            },
            {
                type: "input",
                message: "Enter the employee's role id.",
                name: "role_id"
            },
            {
                type: "input",
                message: "Enter the employee's manager id.",
                name: "manager_id"
            },
        ])
        .then((newEmployee) => {
            db.query('INSERT INTO employees SET ?', newEmployee, function (err, results) {
                err ? console.error(err) : console.log("Your new employee has been created!");
            });
            init();
        })
};

function updateEmployeeRole() {
    db.query('SELECT * FROM roles', function (err, results) {
      err ? console.error(err) : console.log("Employee role has been updated.")
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter the id of the employee that you would like to updated!",
            name: "employee_id"
          },
          {
            type: "input",
            message: "Enter their new role id.",
            name: "employee_role"
          }
        ])
        .then((data) => {
          db.query('UPDATE employee SET role_id = ? WHERE id = ?', [data.employee_role, data.employee_id], function (err, results) {
            err ? console.error(err) : console.log("Employee role has been udpated!");
          });
          init();
        })
    })
};

// Roles 
const getRoles = async () => {
    let data = await db.promise().query("SELECT * from roles");
    console.table(data[0]);
    init();
};

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the title for your new role.",
                name: "title"
            },
            {
                type: "input",
                message: "Enter this role's salary.",
                name: "salary"
            },
            {
                type: "input",
                message: "Enter the roles's associateed department id.",
                name: "department_id"
            }
        ])
        .then((newRole) => {
            db.query('INSERT INTO roles SET ?', newRole, function (err, results) {
                err ? console.error(err) : console.log("Your new role has been created!");
            });
            init();
        })
};

// Department 
const getDepartments = async () => {
    let data = await db.promise().query("SELECT * from departments");
    console.table(data[0]);
  };

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the name of the new department.",
          name: "name"
        }
      ])
      .then((newDepartment) => {
        db.query('INSERT INTO department SET ?', newDepartment, function (err, results) {
          err ? console.error(err) : console.log("Your new department has been created!");
        });
        init();
      })
  };

init();

