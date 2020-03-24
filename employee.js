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

function start() {
  inquirer
    .prompt({
      type: 'list',
      message: 'Please choose a selection',
      choices: [
        viewAllMessage,
        viewByDept,
        viewEmpByManager,
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
        case viewByRole:
          viewAllRoles()
          break
        default:
          console.log('ended on default')
      }
    })
}
function viewAllEmployee() {
  connection.query(
    `SELECT employee.first_name, employee.last_name, role.title, employee.role_id, department.dept_name, salary, concat( employee1.first_name, ' ', employee1.last_name)
      manager, employee1.manager_id
      FROM employee 
      LEFT JOIN role on employee.role_id= role.id
      LEFT JOIN department on department.id = role.department_id
      LEFT JOIN employee employee1 on employee1.id = employee.manager_id`,
    function(err, data) {
      //   console.log(data)
      console.table(data)
    }
  )
}

function viewAllDepartments() {
    connection.query(
        `SELECT dept_name
        FROM department`,
        function(err, data) {
            //   console.log(data)
            console.table(data)
        }
        )
    }

function viewAllRoles() {
    connection.query(
    `SELECT title
    FROM role`,
    function(err, data) {
        //   console.log(data)
        console.table(data)
    }
    )
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
