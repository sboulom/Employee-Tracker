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
var viewByDept = 'View all employees by department'
var viewAllRoles = 'View all roles'
var addEmp = 'Add Employee'
var removeEmp = 'Remove Employee'
var updateEmp = 'Update Employee Role'
var userProfile = []
//modify

function start() {
  inquirer
    .prompt({
      type: 'list',
      message: 'Please choose a selection',
      choices: [
        viewAllEmp,
        viewByDept,
        // viewAllRoles,
        addEmp,
        removeEmp,
        updateEmp
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
        // case viewAllRole:
        //   viewAllRoles()
        //   break
        case addEmp:
          addEmployee()
          break
        case removeEmp:
          removeEmp()
          break
        case updateEmp:
          updateEmp()
          break
        default:
          console.log('ended on default')
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
    }
  )
}

// function viewAllDepartments() {
//   //incorrect here. get it to work
//   connection.query(
//     `SELECT department.dept_name, employee.first_name, employee.last_name
//     LEFT JOIN department ON department.id = role.department_id`,

//     `SELECT department.dept_name, employee.first_name, employee.last_name
//         FROM department
//         LEFT JOIN employee ON department.id = employee.`,

//     function(err, data) {
//       //   console.log(data)
//       console.table(data)
//     }
//   )
// }

// function viewAllRoles() {
//   connection.query(
//     `SELECT title
//     FROM role`,
//     function(err, data) {
//       //   console.log(data)
//       console.table(data)
//       connection.end()
//     }
//   )
// }

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
      },
      {
        type: 'input',
        message: 'Add Salary',
        name: 'userSalary'
      },
      {
        type: 'input',
        message: 'Add Department',
        name: 'userDepartment'
      }
    ])
    .then(function(answer) {
      connection.query(
        {
          first_name: answer.userFirstName,
          last_name: answer.userLastName,
          manager_id: answer.userManagerId,
          role: answer.userRoleId,
          salary: answer.userSalary,
          department_id: answer.userDepartment
        },
        function(err) {
          if (err) throw err
          console.log('Steven did it')
        }
      )
    })
}

// function empByDept(departmentID) {
//   connection.query(
//     `SELECT employee.first_name, employee.last_name, department.dept_name
//         FROM employee
//         LEFT JOIN role on employee.role_id = role.id
//         LEFT JOIN department on department.id = role.department_id
//         WHERE department.id = ?`,
//     departmentID,
//     function(err, data) {
//       console.log(data)
//       console.table(data)
//     }
//   )
//   console.log(empByDept)
// }
