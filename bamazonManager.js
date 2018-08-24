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

function menuOptions() {
    iq.prompt([
        {
            type: 'list',
            message: "Manager options: ",
            choices: ["View [PRODUCTS] for sale", "View [LOW] inventory", "[ADD] item to inventory", "Add [NEW] product", "EXIT"],
            name: 'opt'
        }
    ]).then(function (a) {
        // Get the word in brackets
        var cmd;
        if (a.opt !== "EXIT") {
            cmd = a.opt.split("[")[1].split("]")[0];
        }
        switch (cmd) {
            case undefined:
                console.log("Thanks for using the manager portal.");
                conn.end();
                process.exit(-1);
                break;
            case "PRODUCTS":
                displayItems(menuOptions);
                break;
            case "LOW":
                displayLowStock(menuOptions);
                break;
            case "ADD":
                promptAddItems(addToInventory);
                break;
            case "NEW":
                addRow();
                break;
        }
    });
}

function displayItems(cback) {
    conn.query('SELECT * FROM products', function (err, res) {
        if (err) throw error;
        // Make new table object
        var tab = new sqlTab({
            head: ['id', 'product', 'department', 'price', '# in stock'],
            colWidths: [5, 25, 25, 12, 12]
        });
        res.forEach(function (i) {
            tab.push(
                [i.item_id, i.product_name, i.department_name, i.price, i.stock_quantity]
            );
        });
        console.log(tab.toString());
        cback();
    });
}
function displayLowStock(cback) {
    console.log("Displaying low stock");
    conn.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw error;
        // Make new table object
        var tab = new sqlTab({
            head: ['id', 'product', 'department', 'price', '# in stock'],
            colWidths: [5, 25, 25, 12, 12]
        });
        res.forEach(function (i) {
            tab.push(
                [i.item_id, i.product_name, i.department_name, i.price, i.stock_quantity]
            );
        });
        console.log(tab.toString());
        cback();
    });
}
function promptAddItems(cback) {
    iq.prompt([
        {
            message: "Enter the ID of the item you'd like to add",
            name: "id",
            validate: function validnum(id) {
                return !isNaN(parseInt(id)) || "Must be a number";
            }
        },
        {
            message: "How many?",
            name: "quant",
            validate: function validnum(id) {
                return !isNaN(parseInt(id)) || "Must be a number";
            }
        }
    ]).then(function (a) {
        cback(a.id, a.quant, menuOptions);
    });

}
function addToInventory(itemId, amount, cback) {
    conn.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [amount, itemId], function (err, res) {
        if (err) throw err;
        if (res.affectedRows === 0) {
            console.log(`\nNo rows were updated... Maybe you entered the item id incorrectly?\n`);
            promptAddItems(addToInventory);
        }
        else {
            console.log(`\n${amount} added.\n`);
            cback();
        }
    });
}
function addRow() {
    iq.prompt([
        {
            message: "Enter the name of the product",
            name: 'name',
            validate: function valName(name) {
                return name !== '';
            }
        },
        {
            message: "What department does the product belong in?",
            name: "dept",
            validate: function valDept(dept) {
                return dept !== '';
            }
        },
        {
            message: "What is the item's price?",
            name: "price",
            validate: function validnum(price) {
                return !isNaN(parseFloat(price)) || "Must be a valid decimal number";
            }
        },
        {
            message: "How many do you want to add to stock?",
            name: 'stock'
        }
    ]).then(function(a) {
        conn.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [a.name, a.dept, a.price, a.stock], function(err, res) {
            if (err) throw err;
            console.log(res);
            if (res.affectedRows === 1) {
                console.log(`${a.stock} ${a.name}(s) added at $${a.price} each`);
            }
            menuOptions();
        });
    });
}

menuOptions();