//jshint esversion: 6

// Import modules
var sql = require("mysql");
var iq = require("inquirer");
var sqlTab = require("cli-table");

// connect to the database
var conn = sql.createConnection({
    host: 'localhost',
    user: 'karsten',
    password: 'cheese',
    database: 'bamazon'
});

conn.connect();

function options() {
    iq.prompt([
        {
            message: "Welcome Mr. Supervisor",
            type: "list",
            choices: ["View product sales by department", "Create new department", "QUIT"],
            name: 'resp'
        }
    ]).then(function (i) {
        console.log(i.resp);
        if (i.resp === "View product sales by department") {
            tableJoin();
        }
        else if (i.resp === "Create new department") {
            createNewDept();
        }
        else {
            console.log("Thanks for using the manager portal. Bye!");
            process.exit(-1);
            return;
        }
    });
}
function tableJoin() {
    console.log("Table join");
    conn.query("SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS total_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments INNER JOIN products ON (departments.department_name = products.department_name) GROUP BY departments.department_id", function(err, res) {
        if (err) throw err;
        var tab = new sqlTab({
            head: ["department_id", "department_name", "overhead_costs", "total_sales", "total_profit"],
            colWidths: [16, 23, 17, 15, 15]
        });
        res.forEach(function(i) {
            tab.push(
                [i.department_id, i.department_name, i.over_head_costs, i.total_sales, i.total_profit]
            );
        });
        console.log(tab.toString());
        options();
    });
}

function createNewDept() {
    console.log("Create new dept");
    options();
}

options();