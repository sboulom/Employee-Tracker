var inquirer = require('inquirer')
var mysql = require('mysql')
require('console.table')
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'passwordpassword',
  database: 'employee_db'
})

connection.connect(function(err) {
  console.log('connection id' + connection.threadId)
  start()
})
var viewAllEmp = 'View all employees'
var viewByDept = 'View all department'
var viewAllRole = 'View all roles'
var addEmp = 'Add Employee'
var addRole = 'Add Employee Role'
var addDepart = 'Add Department'
var quit = 'Quit'
//modify

function start() {
  inquirer
    .prompt({
      type: 'list',
      message: 'Please choose a selection',
      choices: [
        viewAllEmp,
        viewByDept,
        viewAllRole,
        addEmp,
        addRole,
        addDepart,
        quit
      ],
      name: 'employee'
    })
    .then(function(userinput) {
      console.log(userinput.employee)
      switch (userinput.employee) {
        case viewAllEmp:
          viewAllEmployee()
          break
        case viewByDept:
          viewAllDepartments()
          break
        case viewAllRole:
          viewAllRoles()
          break
        case addEmp:
          addEmployee()
          break
        case addRole:
          addEmpRole()
          break
        case addDepart:
          addDepartment()
          break
        default:
          console.log('ended on default')
          process.exit()
        //functionality after selection to exit out
      }
    })
}
function viewAllEmployee() {
  connection.query(
    `SELECT employee.first_name, employee.last_name, role.title, department.dept_name, salary, concat( employee1.first_name, ' ', employee1.last_name)
      manager, employee1.manager_id
      FROM employee 
      LEFT JOIN role ON employee.role_id= role.id
      LEFT JOIN department ON department.id = role.department_id
      LEFT JOIN employee employee1 ON employee1.id = employee.manager_id`,
    function(err, data) {
      //   console.log(data)
      console.table(data)
      start()
    }
  )
}

function viewAllDepartments() {
  connection.query(
    `SELECT department.id, department.dept_name FROM department`,

    function(err, data) {
      //   console.log(data)
      console.table(data)
      start()
    }
  )
}

function viewAllRoles() {
  connection.query(
    `SELECT id, title, salary, department_id FROM role`,
    function(err, data) {
      //   console.log(data)
      console.table(data)
      connection.end()
      start()
    }
  )
}

function addEmployee(userProfile) {
  inquirer
    .prompt([
      {
        type: 'input',
        message: ' Add First Name',
        name: 'userFirstName'
      },
      {
        type: 'input',
        message: 'Add Last Name',
        name: 'userLastName'
      },
      {
        type: 'input',
        message: 'Add Manager Name',
        name: 'userManagerId'
      },
      {
        type: 'input',
        message: 'Add Title',
        name: 'userRoleId'
      }
    ])
    .then(function(answer) {
      var manager = answer.userManagerId.split(' ')
      connection.query(
        `SELECT id FROM employee WHERE first_name = ? and last_name = ?`[
          (manager[0], manager[1])
        ],
        function(data, err) {
          connection.query(
            'INSERT INTO employee SET ?',
            {
              first_name: answer.userFirstName,
              last_name: answer.userLastName,
              manager_id: data.id,
              role_id: answer.userRoleId
            },
            function(err) {
              if (err) throw err
              console.log('Steven did it')
              start()
            }
          )
        }
      )
    })
}

function addEmpRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please add employee title',
        name: 'roleTitle'
      },
      {
        type: 'input',
        message: 'Salary',
        name: 'Salary'
      },
      {
        type: 'input',
        message: 'department',
        name: 'department'
      }
    ])
    //go over this
    .then(function(answer) {
      connection.query(
        `SELECT id FROM department WHERE dept_name = ?`,
        answer.department,
        function(err, data) {
          console.log(data)
          connection.query(
            'INSERT INTO role SET ?',
            {
              title: answer.roleTitle,
              salary: answer.Salary,
              department_id: data.id
            },
            function(err) {
              if (err) throw err
              // console.log('Steven did it')
              start()
            }
          )
        }
      )
    })
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Please add department',
        name: 'addDepartment'
      }
    ])
    .then(function(answer) {
      connection.query(
        'INSERT INTO department SET ?',
        {
          dept_name: answer.addDepartment
        },
        function(err) {
          if (err) throw err
          console.log('Steven did it')
          start()
        }
      )
    })
}
