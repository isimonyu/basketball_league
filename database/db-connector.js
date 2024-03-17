// Citation for the following page:
// Date: 02/20/2024
// Database connection based on starter code.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get an instance of mysql we can use in the app
var mysql = require("mysql");

// Create a 'connection pool' by providing credentials
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "classmysql.engr.oregonstate.edu",
  user: "",
  password: "",
  database: "",
});

// Export it for use in our applicaiton
module.exports.pool = pool;
