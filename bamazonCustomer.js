// DEPENDENCY VARIABLES
var mysql = require("mysql");
var inquirer = require("inquirer");

// MYSQL CONNECTION
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "bamazon"
});

// Establish the connection, console log the connection, list the products
connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected to Bamazon " + "\n");
    listproducts()
});

// Function to list the products after connecting
function listproducts() {
    console.log("Selecting available products...\n");

    // Query the database table
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;

        // Loop through the resulting data, list the information for each entry
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + "  ||  " + res[i].product_name + "  ||  " + "Department: " + res[i].department_name + "  ||  " + "Price: " + res[i].price + "  ||  " + "Available Quantity: " + res[i].stock_quantity + "\n----------------------\n");
            // console.log(res[i].product_name);
            // // console.log(res[i].department_name);
            // console.log("Price: " + res[i].price);
            // console.log("--------------------------");
        }
        // End connection
        // connection.end();
    });

    chooseProduct();
}

// Function asking user which product they would like to buy
function chooseProduct() {
    
    connection.query("SELECT * FROM products", function(err, res) {
        // console.log(res.length);
        if(err) throw err;
        
        inquirer.prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter the ID number of the product you would like to purchase',
                validate: function(input) {
                    if(isNaN(input) === false && input <= res.length) {
                        return true;
                    }
                    return "Please enter a number between 1 and " + res.length + ".";
                }
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'Enter the number of units of the selected product you would like to purchase',
                validate: function(input) {
                    if(isNaN(input) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {

            // Query database for selected product
            var sql = "SELECT product_name, stock_quantity, price, department_name FROM products WHERE item_id=?";
            
            connection.query(sql, [answer.id], function (err, res) {
                if (err) throw err;
                // console.log(res);
                
                var userRequest = answer.quantity;
                // console.log(userRequest);
                var name = res[0].product_name;
                var amountAvailable = res[0].stock_quantity;
                // console.log(amountAvailable);
                
                // Check to see if there are enough products in stock to match user demand
                if (amountAvailable >= userRequest) {

                    // Process the user's request
                    purchaseItems(name, res[0].stock_quantity, res[0].price, answer.id, answer.quantity);

                } else {

                // Tell user there is not enough stock to complete thier purchase
                console.log("We're sorry. There are not enough items in stock to fulfill your order.");
                }
            })

        })
    });
}

function purchaseItems(name, amountAvailable, price, product_id, quantity) {
    var newStock = amountAvailable - quantity;
    // console.log(newStock);
    // console.log(product_id);
    var totalPrice = price * quantity;
    inquirer.prompt([
        {
            name: 'confirm',
            type: 'confirm',
            message: 'You have selected ' + name + '. Your total is $' + totalPrice + '. Would you like to process this order?'
        }
    ]).then(function(answer) {
        if(answer.confirm === true) {
            connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newStock, product_id], function(err, res) {
                if(err) throw err;
                    console.log("\nYour transaction is complete.");
                    console.log("Your payment of $" + totalPrice + " has been received.\n");
                    // console.log(res.affectedRows + " product updated." + "\n--------------------\n");
                    inquirer.prompt([
                        {
                            name: 'continue',
                            type: 'list',
                            message: "Which would you like to do?",
                            choices: ["Continue Shopping", "End Session"]
                        }
                    ]).then(function(answer) {
                        if(answer.continue === "Continue Shopping") {
                            listproducts();
                        } else {
                            console.log("Your session has ended. Thank you for shopping with us today!")
                            connection.end();
                        }
                    });
            });
        } else {
            inquirer.prompt([
                {
                    name: 'continue',
                    type: 'list',
                    message: "Which would you like to do?",
                    choices: ["Continue Shopping", "End Session"]
                }
            ]).then(function(answer) {
                if(answer.continue === "Continue Shopping") {
                    listproducts();
                } else {
                    console.log("Your session has ended. Thank you for shopping with us today!")
                    connection.end();
                }
            });
            
        }
    });
}