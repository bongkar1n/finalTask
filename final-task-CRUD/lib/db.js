const mysql = require("mysql");
const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: null,
    database: "final_task",
});
connection.connect((error) => {
    if(!!error){
        console.error(error);
    } else {
        console.log("database connected....");
    }
});

module.exports = connection;