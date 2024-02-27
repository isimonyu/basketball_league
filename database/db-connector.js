// Get an instance of mysql we can use in the app
var mysql = require("mysql");

// FOR development we can use this to fill in with our local db information

var pool = mysql.createPool({
  host: "localhost",
  user: "simon",
  password: "wizard301",
  database: "bball",
});

//  FOR the Project we can use my OSU DB below

// Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "classmysql.engr.oregonstate.edu",
//   user: "cs340_yusimo",
//   password: "7866",
//   database: "cs340_yusimo",
// });

// Export it for use in our applicaiton
module.exports.pool = pool;
