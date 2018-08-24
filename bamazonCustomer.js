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

// Make a table object to better display products
// var table = new sqlTab({
//     head: ['id', 'product', 'department', 'price', '# in stock'],
//     colWidths: [5, 25, 25, 12, 12]
// });

function displayItemsAsTable(cback) {
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
function promptUserBuy() {
    iq.prompt([
        {
            message: "Enter the ID of the item you wish to purchase",
            name: "id",
            validate: function validnum(id) {
                return !isNaN(parseInt(id)) || "Must be a number";
            }
        },
        {
            message: "Enter the quantity you wish to purchase",
            name: "quant"
        }
    ]).then(function (a) {
        checkIdExists(a.id, a.quant);
    });
}
function checkIdExists(id, number) {
    var amountInStock = 0;
    conn.query('SELECT * FROM products WHERE item_id = ?', [id], function (err, res) {
        if (err) throw error;
        if (res.length === 0) {
            console.log("Item not found, please try again.");
            promptUserBuy();
        }
        else {
            amountInStock = res[0].stock_quantity;
            if (amountInStock < number) {
                console.log(`Sorry, there are only ${amountInStock} in stock`);
                promptUserBuy();
            }
            else {
                updateStock(res[0].item_id, amountInStock, number, res[0].price);
            }
        }
    });
}
function updateStock(id, stock, toBuy, price) {
    conn.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [stock-toBuy, id], function(err, res) {
        if (err) throw err;
        console.log(`\n|| ${toBuy} purchased for $${price * toBuy}. Thank you! ||\n`);
        promptUserBuy();
    });
}

displayItemsAsTable(promptUserBuy);
