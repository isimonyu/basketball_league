// App.js

/*
    SETUP
*/
var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const { engine } = require("express-handlebars");
var exphbs = require("express-handlebars"); // Import express-handlebars
app.engine(".hbs", engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set("view engine", ".hbs"); // Tell express to use the handlebars engine whenever
PORT = 9124;

// Database
var db = require("./database/db-connector");

/*
    ROUTES
*/
app.get("/", function (req, res) {
  res.render("index"); // Note the call to render() and not send(). Using render() ensures the templating engine
}); // will process this file, before sending the finished HTML to the client.

app.get("/players", function (req, res) {
  let query1 =
    "SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("players/players", { data: rows });
  });
});

app.get("/coaches", function (req, res) {
  let query1 =
    "SELECT coachID as ID, teamName as Team, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses FROM Coaches JOIN Teams ON Coaches.teamID = Teams.teamID;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("coaches/coaches", { data: rows });
  });
});

app.get("/teams", function (req, res) {
  let query1 = "SELECT teamName as Name, city as City FROM Teams;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("teams/teams", { data: rows });
  });
});

app.get("/games", function (req, res) {
  let query1 = `SELECT Games.gameID as ID, Games.date as Date, H.teamName as 'HomeTeam', Games.homeTeamScore as 'HomeScore', A.teamName as 'AwayTeam', Games.awayTeamScore as 'AwayScore'
  FROM Games
  JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
  JOIN Teams H ON Home.teamID = H.teamID
  JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
  JOIN Teams A ON Away.teamID = A.teamID;`;
  db.pool.query(query1, function (error, rows, fields) {
    // Map the data to format the date
    let formattedData = rows.map((row) => ({
      ...row,
      Date: row.Date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));
    res.render("games/games", { data: formattedData });
  });
});

app.get("/stats", function (req, res) {
  let query1 = `SELECT Games.date as Date, Players.playerName as Name,
  point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FieldGoals', CONCAT(ftMake, '/', ftAttempt) as 'FreeThrows', CONCAT(threePointMake, '/', threePointAttempt) as 'ThreePoints', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
  FROM PlayersGamesStats 
  JOIN Players ON PlayersGamesStats.playerID = Players.playerID
  JOIN Games ON PlayersGamesStats.gameID = Games.gameID;`;
  db.pool.query(query1, function (error, rows, fields) {
    // Map the data to format the date
    let formattedData = rows.map((row) => ({
      ...row,
      Date: row.Date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));
    res.render("stats/stats", { data: formattedData });
  });
});

app.get("/teams/create", function (req, res) {
  db.pool.query(query1, function (error, rows, fields) {
    res.render("teams/addteam");
  });
});

/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
