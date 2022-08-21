const mysql = require('mysql');
const options = require('../mysql/option');

const loginData = {
    host: options.storageConfig.HOST,
    user: options.storageConfig.user,
    password: options.storageConfig.password                                                         
};

// DB 연결
const connection = mysql.createConnection({
host: loginData.host,
port:3306,
user:loginData.user,
password:loginData.password,
database:'diyfood'
})
connection.connect();


module.exports = connection;

// CREATE TABLE user ( 
//   id int NOT NULL auto_increment PRIMARY KEY,
//   email varchar(45) not null,
//   password varchar(200) not null,
//   name varchar(10) not null,
//   reg_date varchar(45)
//   );