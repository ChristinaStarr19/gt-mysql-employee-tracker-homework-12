var mysql = require("mysql");
var inquirer = require("inquirer");

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
        connection.end();
      }
    });
}

function addToCompany() {
  inquirer
    .prompt({
      name: "add",
      type: "list",
      message: "What would you like to add?",
      choices: ["Add_Department", "Add_Roles", "Add_Employee", "EXIT"],
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

function viewCompany() {
  inquirer
    .prompt({
      name: "view",
      type: "list",
      message: "What would you like to view?",
      choices: ["View_Department", "View_Roles", "View_Employees"],
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
        viewEmployee();
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
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
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

// 1) select all departments
// 2) prompt user with department choices, role title, role salary
// 3) insert into role (title, role, department)
//

function add_role() {
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
