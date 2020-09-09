const inquirer = require ("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "empTracker_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  // put stuff here;
  inquirer
    .prompt({
      name: `first_choice`,
      message: `what would you like to do?`,
      type: `list`,
      choices: [
        `View All Employees`,
        `View All Employees by Department`,
        `View All Employees By Manager`,
        `Add Employee`,
        `Update Employee Role`,
        `View All Job Roles`,
        `Add New Job Role`,
        `View All Departments`,
        `Add New Department`,
        `exit`
      ]
    })
    .then(function(answer) {
      // console.log(answer);
      if (answer.first_choice === `View All Employees`) {
        viewAllEmployees();
      }
      else if (answer.first_choice === `View All Employees by Department`) {
        viewByDeptarment();
      }
      else if (answer.first_choice === `View All Employees By Manager`) {
        
        viewByManager();
      }
      else if (answer.first_choice === `Add Employee`) {
        addEmployee();
      }
      else if (answer.first_choice === `Update Employee Role`) {
        console.log(`OH SHIT! what now?`);
        updateEmployeeRole();
      }
      else if (answer.first_choice === `View All Job Roles`) {
        viewRoles();
      }
      else if (answer.first_choice === `Add New Job Role`) {
        addNewRole();
      }
      else if (answer.first_choice === `View All Departments`) {
        viewDepartments();
      }
      else if (answer.first_choice === `Add New Department`) {
        addDepartment();
      } else{
        connection.end();
      }
    });
   
}

function viewAllEmployees() {
  // return new Promise((resolve, reject) => {});

  console.log(`View All Employees`);
  connection.query(`SELECT * FROM employee`, function(err, results) {
    if (err) throw err; 
    console.table(results);
    start();
  });

}

function viewByDeptarment() {
  console.log(`View Employees By Department`);
  // inquirer .prompt({}) .then({});
  connection.query(`SELECT * FROM employee GROUB BY department_id`, function(err, results) {
    if (err) throw err; 
    console.log(results);
  } );
  start();
}

function viewByManager() {
  console.log(`View Employees By Manager`);
  // inquirer .prompt({}) .then({});
  connection.query(`SELECT * FROM employee GROUB BY manager_id`, function(err, results) {
    if (err) throw err; 
    console.log(results);
  } );
  start();
}

function addEmployee() {
  console.log(`Add Employee`);
  connection.query(`SELECT * FROM role`, function(err, role_res) {
    if (err) throw err; 
    console.table(role_res);
    inquirer 
      .prompt([
        {
          name: 'first_name',
          type: 'input',
          message: `what is the employee's first name?`
        },
        {
          name: 'last_name',
          type: 'input',
          message: `what is the employee's last name?`
        },
        {
          name: 'role_id',
          type: 'list',
          choices: function() {
            const roleList = [];
            role_res.forEach( (i) => {
              roleList.push(i.title);
            });
            return roleList;
          },
          message: `what is the employee's role?`
        }
      ]) 
      .then( (answer) => {
        let roleID = "";
        role_res.forEach( (i) => {
          if(i.title === answer.role_id) {
            roleID = i.id;
          }
        });
        connection.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: roleID
          },
          function(err) {
            if(err) throw err;
            console.log(`employee name entered successful`)
            start();
          }
        );
      });
  });
}


function updateEmployeeRole() {inquirer .prompt({}) .then({});}


function viewRoles() {
  console.log(`View All Job Roles`);
  connection.query(`SELECT * FROM role`, function(err, results) {
    if (err) throw err; 
    console.table(results);
    start();
  });
}

function addNewRole() {
  console.log(`Add New Job Role`);
  connection.query(`SELECT * FROM departments`, function(err, results) {
    if (err) throw err; 
    // console.table(results);
    inquirer 
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: `whaty is the name of the new role?`
        },
        {
          name: 'salery',
          type: 'input',
          message: `what is the salery of the new role`
        },
        {
          name: 'department_id',
          type: 'list',
          choices: function() {
            const deptList =[];
            // for (let i = 0; i < results.length; i++) {
            results.forEach( (i) => {
              // console.log(results[i].dept_name);
              deptList.push(i.dept_name);
            });
            return deptList;
          },
          message: `what department is the new role in?`
        }
      ]) 
      .then( (answer) => {
        // parse out department id here
        let deptID = "";
        results.forEach( (i) => {
          if(i.dept_name === answer.department_id) {
            deptID = i.id;
          }
        });
        
        connection.query(
          'INSERT INTO role SET ?',
          {
            title: answer.title,
            salery: answer.salery,
            department_id: deptID
          },
          function(err) {
            if(err) throw err;
            console.log(`role entered successful`)
            start();
          }
        );

      });
  });
}

function viewDepartments() {
  console.log(`View All Departments`);
  connection.query(`SELECT * FROM departments`, function(err, results) {
    if (err) throw err; 
    console.table(results);
    start();
  });
}

function addDepartment() {
  console.log(`Add New Department`);
  inquirer 
  .prompt({
    name: 'dept_name',
    type: 'input',
    message: `whaty is the name of the new deptartment?`
  }) 
  .then( (answer) => {
    connection.query(
      'INSERT INTO departments SET ?',
      {
        dept_name: answer.dept_name
      },
      function(err) {
        if(err) throw err;
        console.log(`department entered successful`)
        start();
      }
    );

  });
}



