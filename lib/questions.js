const mainQ = [
    {
        type: 'list',
        message: 'what would you like to do',
        name: 'mainQ',
        choices: [
            {name: 'view all departments', value: 0}, 
            {name: 'view all roles', value: 1}, 
            {name: 'view all employees', value: 2},
            {name: 'add a department', value: 3},
            {name: 'add a role', value: 4},
            {name: 'add an employee', value: 5},
            {name: 'update an employee role', value: 6},
            {name: 'exit', value: 7}
        ]
      }

]

const addDepartment = [
    {
        type: 'input',
        message: 'name of the department:',
        name: 'dName',
      }
]

const addRole = [
    {
        type: 'input',
        message: 'enter the name:',
        name: 'roleName',
      },
      {
        type: 'input',
        message: 'enter the salary:',
        name: 'roleSalary',
      },
      {
        type: 'input',
        message: 'enter the department id:',
        name: 'roleDepartment',
      },
]
const addEmployee = [
    {
        type: 'input',
        message: 'employee’s first name:',
        name: 'employeeName',
      },
      {
        type: 'input',
        message: 'employee’s last name:',
        name: 'employeeLastName',
      },
      {
        type: 'input',
        message: 'employee’s role:',
        name: 'employeeRole',
      },
      {
        type: 'input',
        message: 'employee’s manager:',
        name: 'employeeManager',
      },
]
module.exports = {mainQ, addDepartment, addRole, addEmployee};