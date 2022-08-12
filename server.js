// Require npm pacages 
const mysql = require("mysql2");
const cT = require("console.table");
const inquirer = require("inquirer");

// connect to sql db 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
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
        if (answers.questions === "View all Employees") {
            getEmployees()
        } else if (answer.questions === "Add Employee") {
            addEmployee()
        } else if (answer.questions === "View all Roles") {
            getRoles()
        } else if (answer.questions === "Add Role") {
            addRole()
        } else if (answer.questions === "View all Departments") {
            getDepartments()
        } else if (answer.questions === "Add Department") {
            addDepartment()
        } else if (answer.questions === "Update Employee Role") {
            updateEmployeeRole()
        } else { console.log("Goodbye!") };
    })
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
                initialQuestion()
            });
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
          initialQuestion()
        });
      })
  }

init();

