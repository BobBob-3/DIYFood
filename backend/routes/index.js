const express = require('express');
const connection = require('../mysql/mysql_connection')
const router = express.Router();

//app.use('/api',api);
// user create
// CREATE TABLE user ( 
//   id int NOT NULL auto_increment PRIMARY KEY,
//   email varchar(45) not null,
//   name varchar(10) not null,
//   reg_date varchar(45),
//   password varchar(150) not null);

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * from user', function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
});
});

module.exports = router;
