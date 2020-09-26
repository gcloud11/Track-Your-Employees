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
                "Add A Department",
                "Add An Employee",
                "Add A Role",
                "Update Employee Manager",
                "View Salaries Made by Departement",
                ]
    })
    .then(function(answer) {

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
            case "Add A Department":
                addDept();
                break;
        }
        
        switch (answer.One) {
            case "Add An Employee":
                addEmp();
                break;
        }

        switch (answer.One) {
            case "Add A Role":
                addRole();
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
    var empAll =
      "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id;";
    connection.query(empAll, function(err, answer) {
      console.log("\n Employee View!");
      console.table(answer);
    });
  };

// This allows user to view all employee roles in the database
function viewRoles() {
    connection.query("SELECT * FROM roles", function(err, answer) {
      console.log("\n Role View");
      console.table(answer);
    });
  }

function viewDept(){
    connection.query("SELECT * FROM department", function(err, answer) {
        console.log("\n Department View");
        console.table(answer);
    } );
};

// Here this functions gets all employees and allows employee role update
function updateErol() {
    let employeesAll = [];
    connection.query("SELECT * FROM employee", function(err, answer) {
            //   console.log(answer); //as an object
      for (let i = 0; i < answer.length; i++) {
        let employeeArray =
          answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
        employeesAll.push(employeeArray);
      }
      console.log(employeesAll)
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "updateEmpRole",
            message: "select employee to update role",
            choices: employeesAll
          },
          {
            type: "list",
            message: "select new role",
            choices: ["Accountant","Computer Programmer", "Sales"],
            name: "newrole"
          }
       ])
       .then(function(answer) {
        console.log("Updated...", answer);
        const newId = {};
        newId.employee = parseInt(answer.updateEmpRole.split(" ")[0]);
        if (answer.newrole === "Accountant") {
          newId.roles_id = 1;
        } else if (answer.newrole === "Computer Programmer") {
          newId.roles_id = 2;
        } else {
            answer.newrole === "Sales"
            newId.roles_id = 3;
        };
        connection.query(
          "UPDATE employee SET roles_id = ? WHERE id = ?",
          [newId.roles_id, newId.employee],
          function(err, data) {
            start();
          }
        );
      });
  });
}

//Adding New Department 
function addDept() {
    inquirer
      .prompt({
        type: "input",
        message: "Enter department name",
        name: "dept"
      })
      .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.dept
          },
          function(err, answer) {
            if (err) {
              throw err;
            }
          }
        ),
          console.table(answer);
      });
  }
  
//   function deleteDept() {
//     inquirer
//       .prompt({
//         type: "input",
//         message: "enter department name",
//         name: "dept"
//       })
//       .then(function(answer) {
//         connection.query(
//           "DELETE FROM employee WHERE ?",
//           {
//             name: answer.dept
//           },
//           function(err, answer) {
//             if (err) {
//               throw err;
//             }
//           }
//         ),
//           console.table(answer);
//       });
//   }

//Adding a new Employee
// function addEmp() {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           message: "Enter employee first name",
//           name: "firstname"
//         },
//         {
//           type: "input",
//           message: "Enter employee last name",
//           name: "lastname"
//         }
//       ])
//       .then(function(answer) {
//         connection.query(
//           "INSERT INTO employee SET ?",
//           {
//             first_name: answer.first_name,
//             last_name: answer.last_name,
//             roles_id: answer.roles_id,
//             manager_id: answer.manager_id,
//           },
//           function(err, answer) {
//             if (err) {
//               throw err;
//             }
//             console.table(answer);
//           }
//         );
//       });
//   }

//Adding a new Employee Role
// function addRole() {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           message: "enter employee title",
//           name: "addtitle"
//         },
//         {
//           type: "input",
//           message: "enter employee salary",
//           name: "addsalary"
//         },
//         {
//           type: "input",
//           message: "enter employee department id",
//           name: "addDepId"
//         }
//       ])
//       .then(function(answer) {
//         connection.query(
//           "INSERT INTO roles SET ?",
//           {
//             title: answer.addtitle,
//             salary: answer.addsalary,
//             department_id: answer.addDepId
//           },
//           function(err, answer) {
//             if (err) {
//               throw err;
//             }
//             console.table(answer);
//           }
//         );
//       });
//   }

start();
