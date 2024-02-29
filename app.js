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

// Player ROUTES
app.get("/players", function (req, res) {
  let query1 =
    "SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("players/players", { data: rows });
  });
});

// Coaches ROUTES
app.get("/coaches", function (req, res) {
  let query1 =
    "SELECT coachID as ID, teamName as Team, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses FROM Coaches JOIN Teams ON Coaches.teamID = Teams.teamID;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("coaches/coaches", { data: rows });
  });
});

// Teams ROUTES
app.get("/teams", function (req, res) {
  let query1 =
    "SELECT teamID as ID, teamName as Name, city as City FROM Teams;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("teams/teams", { data: rows });
  });
});

app.get("/teams/create", function (req, res) {
  res.render("teams/addteam");
});

app.post("/teams/create", function (req, res) {
  let data = req.body;

  query1 = `INSERT INTO Teams (teamName, city)
    VALUES ("${data.teamName}", "${data.city}");`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Team Added");
      res.sendStatus(200);
    }
  });
});

app.get("/teams/edit/:_teamID", function (req, res) {
  // Query to get information
  query1 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams WHERE teamID = ${req.params._teamID}`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log(rows);
      res.render("teams/editteam", { data: rows });
    }
  });
});

app.post("/teams/edit/:_teamID", function (req, res) {
  let data = req.body;
  query1 = `UPDATE Teams 
    SET teamName = "${data.teamName}", city = "${data.city}" 
    WHERE teamID = ${parseInt(req.params._teamID)};`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Updated Team");
      res.sendStatus(200);
    }
  });
});

app.delete("/teams/delete", function (req, res) {
  let data = req.body;

  query1 = `DELETE FROM Teams WHERE teamID = "${data.teamID}";`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Team Deleted");
      res.sendStatus(200);
    }
  });
});

// Games ROUTES
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

// Stats ROUTES
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

app.get("/stats/create", function (req, res) {
  res.render("stats/addstats");
});

app.post("/stats/create", function (req, res) {
  let data = req.body;

  query1 = `INSERT INTO Stats (date, name, points, assists, rebounds, fieldgoals, freethrows, threepoints, blocks, steals, fouls, minutes)
    VALUES ("${data.date}", "${data.name}"), "${data.date}", "${data.name}"),"${data.date}", "${data.name}"), `;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Team Added");
      res.sendStatus(200);
    }
  });
});

app.post("/stats/create", function (req, res) {
  let data = req.body;

  query1 = `UPDATE Stats 
      SET date = "${data.Date}", name = "${data.name}", points = "${data.points}",  assists = "${data.assists}", rebounds = "${data.rebounds}", 
      FieldGoals = "${data.FieldGoals}",  FreeThrows = "${data.FreeThrows}", ThreePoints = "${data.ThreePoints}",  Blocks = "${data.Blocks}", Steals = "${data.Steals}", 
      Fouls = "${data.Fouls}", Minutes = "${data.Minutes}", 
      WHERE statID = ${req.params._statID};`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Updated Team");
      res.sendStatus(200);
    }
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
