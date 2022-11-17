const mysql = require('mysql2')
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "12345678",
  database: "codegym_edu",
});

connection.connect((err)=>{
    if(err) {
        console.log(err.message)
        return
    }else{
        console.log("Connection")
    }
});