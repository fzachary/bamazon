var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected to Bamazon " + connection.threadId + "\n");
    listproducts()
});

function listproducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id);
            console.log(res[i].product_name);
            // console.log(res[i].department_name);
            console.log("Price: " + res[i].price);
            console.log("--------------------------");
        }
        connection.end();
    });
}