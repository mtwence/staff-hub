// Require npm pacages 
const mysql = require("mysql2");
const cTable = require("console.table");
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
      } else if (answerOptions.db === "Add Employee") {
        addEmployee()
      } else if (answerOptions.db === "View all Roles") {
        getRoles()
      } else if (answerOptions.db === "Add Role") {
        addRole()
      } else if (answerOptions.db === "View all Departments") {
        getDepartments()
      } else if (answerOptions.db === "Add Department") {
        addDepartment()
      } else if (answerOptions.db === "Update Employee Role") {
        updateEmployeeRole()
      } else {console.log("Goodbye!")};
    })
};
  