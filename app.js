var mysql = require("mysql");
var inquirer = require("inquirer");
const util = require("util");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Virtue77$GOD",
  database: "company_db",
});
// connection.query = util.promisify(connection.query)
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("Your connection has started...\n");
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add_To_Company", "View_Company", "Update_Company", "EXIT"],
    })
    .then((answer) => {
      if (answer.action === "Add_To_Company") {
        console.log("You chose Add_To_Company...\n");
        addToCompany();
      } else if (answer.action === "View_Company") {
        console.log("You chose View_Company...\n");
        viewCompany();
      } else if (answer.action === "Update_Company") {
        console.log("You chose Update_Company...\n");
        updateCompany();
      } else {
        console.log("Thank you for visiting.");
        connection.end();
      }
    });
}

//All of the View Functions
function viewCompany() {
  inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "What would you like to view?",
      choices: ["View_Department", "View_Roles", "View_Employees",],
    })
    .then((answer) => {
      if (answer.view === "View_Department") {
        console.log("You chose View_Department...\n");
        viewDepartment();
      } else if (answer.view === "View_Roles") {
        console.log("You chose View_Roles...\n");
        viewRoles();
      } else if (answer.view === "View_Employees") {
        console.log("You chose View_Employees...\n");
        viewEntireCompany();
  
      }
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
}


function viewEntireCompany() {
//  return 
 connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id;",
 (err, data) => {
  if (err) throw err;
  console.table(data);
  start();
});
}

//All the Add Functions here
function addToCompany() {
  inquirer
    .prompt({
      name: "add",
      type: "list",
      message: "What would you like to add?",
      choices: ["Add_Department", "Add_Roles", "Add_Employee"],
    })
    .then((answer) => {
      if (answer.add === "Add_Department") {
        console.log("You chose Add_Department...\n");
        addDepartment();
      } else if (answer.add === "Add_Roles") {
        console.log("You chose Add_Roles...\n");
        addRoles();
      } else if (answer.add === "Add_Employee") {
        console.log("You chose Add_Employee...\n");
        addEmployee();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "addDepartment",
      type: "input",
      message: "What is the name of your department?",
    })
    .then((answer) => {
      connection.query(
        `INSERT INTO department (name)
            VALUES ("${answer.addDepartment}");`,
        (err, data) => {
          if (err) throw err;
          start();
        }
      );
    });
}

function addRoles() {
  //Show Department
  connection.query("select * from department", (err, data) => {
    const departmentChoices = data.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });

    inquirer
      .prompt([
        {
          name: "departmentId",
          type: "list",
          message: "What department would you like to add the role",
          choices: departmentChoices,
        },
        {
          name: "title",
          type: "input",
          message: "What is the name of the role",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary?",
        },
      ])
      .then((answer) => {
        console.table(answer);
        connection.query(
          `insert into role (title, salary, department_id) values ("${answer.title}","${answer.salary}",${answer.departmentId}) `
        );
      });
  });
}

"SELECT first_name, last_name, manager_id FROM employee",
  "WHERE employee.id = manager_id";
function addEmployee() {
  //Show Manager to make choice, doesn't work, maybe because there is only one manager.

  // Show Role to make choice
  connection.query("select * from role", (err, data) => {
    const roleChoices = data.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    connection.query(
      "SELECT first_name, last_name, id FROM employee",
      (err, data) => {
        const managerChoices = data.map((employee) => {
          return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id,
          };
        });
        managerChoices.push({ name: "none", value: null });
        console.log(managerChoices);
        inquirer
          .prompt([
            {
              name: "roleID",
              type: "list",
              message: "Choose your role.",
              choices: roleChoices,
            },
            {
              name: "managerID",
              type: "list",
              message: "Choose your manager.",
              choices: managerChoices,
            },
            {
              name: "firstName",
              type: "input",
              message: "What is your first name?",
            },
            {
              name: "lastName",
              type: "input",
              message: "What is your last name?",
            },
          ])
          .then((response) => {
            console.table(response);
            connection.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) values ("${response.first_name}","${response.last_name}",${response.roleID}, ${response.managerID}) `
            );
          });
      }
    );
  });
}

function updateCompany() {
  inquirer
  .prompt({
    name: "update",
    type: "list",
    message: "What would you like to update?",
    choices: ["Update_EmployeeRoles", "Delete_Employees",]
  })
  .then((answer) => {
    if (answer.view === "Update_EmployeeRoles") {
      console.log("You chose to Update Employee Role...\n");
      updateEmployeeRole();
    } else if (answer.view === "Delete_Employees") {
      console.log("You chose to Delete an Employee...\n");
      deleteEmployee();
    } 
  });
}

function updateEmployeeRole() {
  connection.query("select * from role", (err, data) => {
    const roleChoices = data.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
      inquirer
        .prompt([
          {
            name: "roleID",
            type: "list",
            message: "Choose your role.",
            choices: roleChoices,
          },
          {
            name: "id",
            type: "input",
            message: "What is your employee ID?",
          },
        ])
        .then((response) => {
          console.table(response);
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ? ", 
            [
              {
                rold_id: response.roleID
              },
              {
                id: response.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Employee Role successfully updated.");
              start();
            }
          );
        });
      }
  );
}