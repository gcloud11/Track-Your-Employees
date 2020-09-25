//Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const connection = require("./db/connection.js")
    


//Function to start questions
function start() {
    inquirer
    .prompt({
      name: "One",
      type: "list",
      message: "What would you like to do",
      choices: [
                "View All Employees",
                "View Roles",
                "View Departments",
                "Update Employee Role",
                "Add An Employee",
                "Remove An Employee",
                "Update Employee Manager",
                "View Salaries Made by Departement",
                ]
    })
    .then(function(answer) {
        // based on their answer
        switch (answer.One) {
            case "View All Employees":
                viewAllEmp();
                break;
        }

        switch (answer.One) {
            case "View Roles":
                viewRoles();
                break;
        }

        switch (answer.One) {
            case "View Departments":
                viewDept();
                break;
        }

        switch (answer.One) {
            case "Update Employee Role":
                updateErol();
                break;
        }

        switch (answer.One) {
            case "Add An Employee":
                updateEman();
                break;
        }

        switch (answer.One) {
            case "Remove An Employee":
                viewEman();
                break;
        }

        switch (answer.One) {
            case "Update Employee Manager":
                viewDep();
                break;
        }

        switch (answer.One) {
            case "View Salaries Made by Departement":
                viewSal();
                break;
        }
      });
};

// This allow users to see all employees in database 
function viewAllEmp() {
    console.log("Getting all emplyees");
    var allEmpys =
      "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id;";
    connection.query(allEmpys, function(err, answer) {
      console.log("\n Got ALL!");
      console.table(answer);
    });
  };

// This allows user to view all employee roles in the database
function viewRoles() {
    connection.query("SELECT * FROM roles", function(err, answer) {
      console.log("\n Got the roles? Yes!");
      console.table(answer);
    });
  }

function viewDept(){
    connection.query("SELECT * FROM department", function(err, answer) {
        console.log("\n Departments? Yup!");
        console.table(answer);
    } );
};
start();
