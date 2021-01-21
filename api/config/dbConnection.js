var mysql = require('mysql2');

const pool = mysql.createPool({
   	host: 'us-cdbr-east-03.cleardb.com',
	user: 'bd63f2f52fae36',
	password: 'befb8286',
	database: 'heroku_c5b841fa2f2e903'	
});

module.exports = pool.promise();