const inquirer = require('inquirer');
const clc = require('cli-color')
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { mainQ, addDepartment, addRole, addEmployee } = require('./lib/questions');
const e = require('express');
const ListPrompt = require('inquirer/lib/prompts/list');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'YourPassword',
      database: 'employee_tracker'
    },
    console.log('Connected to the election database.')
  );

// Select eployee from table
function selectEmployee() {
    var employeeChoices =[];
    db.query(`SELECT first_name,last_name FROM employee`, (err,data) => {
        if(err) throw err;
        for ( i=0; i< data.length; i++) {
            employeeChoices.push(data[i].first_name);
        }
        // Q for edit after select
        inquirer.prompt([
            {
                message: "which employee's role do you want to update? ",
                type: "list",
                choices: employeeChoices,
                name: "editRole"
            } 
        ])
        .then((answers) => {
            inquirer.prompt([
                {
                    message: "Enter new role id:",
                    type: "input",
                    name: "newRole"
                }
            ])
            .then((answer) => {
                db.query(`UPDATE employee
                         SET role_id = ${answer.newRole} 
                         WHERE first_name = '%${answers.editRole}%' `,(err,rows) =>{
                    console.log(clc.red ('employee '  + answers.editRole +' updated' ));

                    init();
                })

            })
        })


    })

}


  // add department to mysql
function addDepartmentQ() {
    inquirer
    .prompt(addDepartment)
    .then((answers) => {
        db.query(`INSERT INTO department(name) VALUES ("${answers.dName}")`);
        db.query(`select * from department where Id=(SELECT LAST_INSERT_ID())` , (err,rows) => {
            console.table(rows);
            return init();
        } )
    })

    .catch((error) => {
        if (error.isTtyError) {
          console.log("Your console environment is not supported!")
        } else {
          console.log(error)
        }
    })
}  

// add role to Mysql
function addroleQ() {
    inquirer
    .prompt(addRole)
    .then((answers) => {
        db.query(`INSERT INTO role (title,salary,department_id) VALUES ("${answers.roleName}","${answers.roleSalary}","${answers.roleDepartment}")`);
        db.query(`select * from role where Id=(SELECT LAST_INSERT_ID())` , (err,rows) => {
            console.table(rows);
            return init();
        } )
    })

    .catch((error) => {
        if (error.isTtyError) {
          console.log("Your console environment is not supported!")
        } else {
          console.log(error)
        }
    })
}  
  
// add Employee to Mysql
function addEmployeeQ() {
    inquirer
    .prompt(addEmployee)
    .then((answers) => {
        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${answers.employeeName}","${answers.employeeLastName}","${answers.employeeRole}","${answers.employeeManager}")`);
        db.query(`select * from role where Id=(SELECT LAST_INSERT_ID())` , (err,rows) => {
            console.table(rows);
            return init();
        } )
    })

    .catch((error) => {
        if (error.isTtyError) {
          console.log("Your console environment is not supported!")
        } else {
          console.log(error)
        }
    })
}  





// main repait Q
function init() {
inquirer
.prompt(mainQ)
.then((answers) => {
    if (answers.mainQ === 0) {
        db.query(`SELECT * FROM department`,(err,rows) =>{
            console.table(rows);
            return init();
        })
        
        
    }else if(answers.mainQ === 1) {
        db.query(`SELECT * FROM role`,(err,rows) =>{
            console.table(rows);
            return init();
        })
    }else if(answers.mainQ === 2) {
        db.query(`SELECT * FROM employee`,(err,rows) =>{
            console.table(rows);
            return init();
        })

    }else if(answers.mainQ === 3) {        
        addDepartmentQ();

}else if(answers.mainQ === 4) {
        addroleQ();
    }else if(answers.mainQ === 5) {
        addEmployeeQ();
    }else if(answers.mainQ === 6) {
        selectEmployee();
    } else return process.exit(0);

})
.catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!")
    } else {
      console.log(error)
    }
})
  
}


// lunch script
init();