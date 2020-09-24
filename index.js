//Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");


//Function to start questions
function start() {
    inquirer
    .prompt({
      name: "One",
      type: "list",
      message: "What would you like to do",
      choices: [
                "View All Employees",
                "Add An Employee",
                "Remove An Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View Employees by Manager",
                "View Employees by Department",
                "View Salaries Made by Departement",
                ]
    })
    .then(function(answer) {
        // based on their answer
        switch (answer.One) {
            case "View All Employees":
                viewAll();
                break;
        }

        switch (answer.One) {
            case "Add An Employees":
                addE();
                break;
        }

        switch (answer.One) {
            case "Remove An Employee":
                removeE();
                break;
        }

        switch (answer.One) {
            case "Update Employee Role":
                updateErol();
                break;
        }

        switch (answer.One) {
            case "Update Employee Manager":
                updateEman();
                break;
        }

        switch (answer.One) {
            case "View Employees by Manager":
                viewEman();
                break;
        }

        switch (answer.One) {
            case "View Employees by Department":
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


start();