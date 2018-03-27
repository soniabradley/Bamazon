// node modules (npm)
var mysql = require("mysql");
var Table = require("cli-table");
var inquirer = require("inquirer");

// create connection (information) for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "MyNewPass",
  database: "bamazon_db"
})

// new cli-table instantiate
// var table = new Table({
//   head: ['ItemID', 'ProductName', 'DepartmentName', 'Price', 'StockQuantity']

// })

// initialize connection
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
})
// function to print all items to the console, uses npm module cli-table
var start = function () {
  connection.query("SELECT * FROM Products", function (err, res) {
    // add all of the rows to the cli-table
    for (var i = 0; i < res.length; i++) {
      // table is Array, so you can push
      console.log(res[i].ItemID+" || " +res[i].ProductName+" || " +res[i].DepartmentName+" || " +res[i].Price+" || " +res[i].StockQuantity+"\n");
    }
    promptCustomer(res);
  })
}
//1. Ask user question (inquirer)
//2. If necessary, access database depending on user answer to question (mysql db)
//3. Once you get data from db, display on terminal using table (cli-table)
var promptCustomer = function (res) {
  inquirer.prompt([{
      type: 'input',
      name: 'choice',
      message: "Which product would you like to purchase? [enter Product Name],[Quit with Q]"
    }]).then(function (answer) {
      var correct = false;
      // Quit with Q
      if(answer.choice.toUpperCase()=="Q"){
        process.exit();
      }
      // type in item name and it will loop through the response
      for (var i = 0; i < res.length; i++) {
        if (res[i].ProductName === answer.choice) {
          // if product is in the string = true
          correct = true;
          // it then makes the product choice
          var product = answer.choice;
          // set's id to the product selected
          var id = i;
    inquirer.prompt({
          type: "input",
          name: "quantity",
          message: "How many would you like to buy?",
          validate: function (value) {
              if (isNaN(value) == false) {
                return true;
              } else {
                return false;
              }
            }
          }).then(function (answer) {
              if ((res[id].StockQuantity - answer.quantity) > 0) {
                connection.query("UPDATE Products SET StockQuantity = '"+(res[id].StockQuantity - answer.quantity)+"'Where ProductName='"+product+"'", 
                function(err, res2) {
                    console.log("------- Updated Inventory ---------");
                    start();
                  })
              } else {
                console.log("Not a valid selection");
                promptCustomer(res);
              }
            });
        }
      }
      if (i === res.length && correct === false) {
        console.log("Not a valid selection");
        promptCustomer(res);
      }
      // // var promptCustomer = function (res) {
      //   inquirer.prompt([
      //     {
      //       type: 'input',
      //       name: 'total',
      //       message: "Total cost of your purchase is $ "
      //     }]
      // }


    })
}