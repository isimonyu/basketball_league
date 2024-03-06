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
    res.render("coaches", { data: rows });
  });
});

app.get("/teams", function (req, res) {
  let query1 = "SELECT teamName as Name, city as City FROM Teams;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("teams/teams", { data: rows });
  });
});

app.get("/games", function (req, res) {
  let query1 = `SELECT Games.gameID as ID, Games.date as Date, H.teamName as 'Home Team', Games.homeTeamScore as 'Home Score', A.teamName as 'Away Team', Games.awayTeamScore as 'Away Score'
  FROM Games
  JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
  JOIN Teams H ON Home.teamID = H.teamID
  JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
  JOIN Teams A ON Away.teamID = A.teamID;`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("games", { data: rows });
  });
});

<<<<<<< Updated upstream
=======
app.get("/games/create", function (req, res) {
  // Query Teams to use as dropdown
  let query1 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("games/addgame", { data: rows });
  });
});

app.post("/games/create", function (req, res) {
  let data = req.body;
  console.log(data);
  let query1 = `INSERT INTO Games(date, homeTeamScore, awayTeamScore)
    VALUES ("${data.date}", ${parseInt(data.homeScore)}, ${parseInt(
    data.awayScore
  )});`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Get the gameID
      let gameID = rows.insertId;
      let query2 = `INSERT INTO TeamsGames(gameID, teamID, isHome)
        VALUES (${parseInt(gameID)}, ${parseInt(data.homeTeamID)}, True);`;
      let query3 = `INSERT INTO TeamsGames(gameID, teamID, isHome)
        VALUES (${parseInt(gameID)}, ${parseInt(data.awayTeamID)}, False);`;
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        } else {
          db.pool.query(query3, function (error, rows, fields) {
            console.log("Coach Added");
            res.sendStatus(200);
          });
        }
      });
    }
  });
});

app.get("/games/edit/:_gameID", function (req, res) {
  // Query to get game information
  let query1 = `SELECT Games.gameID as ID, Games.date as Date, H.teamName as HomeTeam, H.teamID as HomeTeamID, 
    Games.homeTeamScore as HomeScore, A.teamName as AwayTeam, A.teamID as AwayTeamID, Games.awayTeamScore as AwayScore
    FROM Games
    JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
    JOIN Teams H ON Home.teamID = H.teamID
    JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
    JOIN Teams A ON Away.teamID = A.teamID
    WHERE Games.gameID = ${parseInt(req.params._gameID)};`;
  // Query for Team dropdown
  let query2 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      // Format the date to use as default value
      let date = rows[0].Date;
      let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      let game = rows.map((row) => ({
        ...row,
        Date: formattedDate,
      }));
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render("games/editgame", { data: game, teams: rows });
        }
      });
    }
  });

  app.post("/games/edit/:_gameID", function (req, res) {
    let data = req.body;
    let query1 = `UPDATE Games
    SET date = "${data.date}", homeTeamScore = ${parseInt(
      data.homeScore
    )}, awayTeamScore = ${parseInt(data.awayScore)}
    WHERE gameID = ${parseInt(req.params._gameID)};`;
    let query2 = `Update TeamsGames
    SET teamID = ${parseInt(data.homeTeamID)}
    WHERE gameID = ${parseInt(req.params._gameID)} AND isHome = True;`;
    let query3 = `Update TeamsGames
    SET teamID = ${parseInt(data.awayTeamID)}
    WHERE gameID = ${parseInt(req.params._gameID)} AND isHome = False;`;
    db.pool.query(query1, function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        db.pool.query(query2, function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            db.pool.query(query3, function (error, rows, fields) {
              if (error) {
                console.log(error);
                res.sendStatus(400);
              } else {
                console.log("Updated Game");
                res.sendStatus(200);
              }
            });
          }
        });
      }
    });
  });
});

app.delete("/games/delete", function (req, res) {
  let data = req.body;

  query1 = `DELETE FROM Games WHERE gameID = "${data.gameID}";`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Game Deleted");
      res.sendStatus(200);
    }
  });
});

// Stats ROUTES

// SELECT
>>>>>>> Stashed changes
app.get("/stats", function (req, res) {
  let query1 = `SELECT Games.date as Date, Players.playerName as Name,
  point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FGM/FGA', CONCAT(ftMake, '/', ftAttempt) as 'FTM/FTA', CONCAT(threePointMake, '/', threePointAttempt) as '3PM/3PA', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
  FROM PlayersGamesStats 
  JOIN Players ON PlayersGamesStats.playerID = Players.playerID
  JOIN Games ON PlayersGamesStats.gameID = Games.gameID;`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("stats", { data: rows });
  });
});

<<<<<<< Updated upstream
app.get("/teams/create", function (req, res) {
  let query1 = `CREATE TABLE Teams (
    teamID INT AUTO_INCREMENT UNIQUE NOT NULL,
    teamName varchar(70) UNIQUE NOT NULL,
    city varchar(70) NOT NULL,
    PRIMARY KEY (teamID));`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("teams/addteam");
  });
});

=======


app.post("/stats/create", function (req, res) {
  let data = req.body;
  console.log(data);

  // Adding new stats
  let query1 = `INSERT INTO PlayersGamesStats(gameID, playerID, assist, point, rebound, fgAttempt, fgMake, ftAttempt, ftMake, threePointAttempt, threePointMake, block, steal, playerFoul, playerMinute)
            VALUES ("${data.gameID}", "${data.playerID}", "${parseInt(data.assists)}", "${parseInt(data.points)}", "${parseInt(data.rebounds)}", "${parseInt(data.FieldGoals)}", "${parseInt(data.FreeThrows)}", "${parseInt(data.ThreePoints)}", "${parseInt(data.Blocks)}", "${parseInt(data.Steals)}", "${parseInt(data.Fouls)}", "${parseInt(data.Minutes)}")`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {

      console.log("Stats Added");
      res.sendStatus(200);
    }
  });
});

app.post("/stats/create", function (req, res) {
  let data = req.body;

  // Updating stats
  query1 = `UPDATE PlayersGamesStats
            SET gameID = "${data.gameID}", playerID = "${data.playerID}", assist = "${parseInt(data.assists)}", point = "${parseInt(data.points)}", rebound = "${parseInt(data.rebounds)}", fgAttempt = "${parseInt(data.FieldGoals)}", ftMake = "${parseInt(data.FreeThrows)}", threePoints = "${parseInt(data.ThreePoints)}", block = "${parseInt(data.Blocks)}", steal = "${parseInt(data.Steals)}", playerFoul = "${parseInt(data.Fouls)}", playerMinute = "${parseInt(data.Minutes)}"
            WHERE gameID = "${data.gameID}"`


  // Deleting Stats
app.delete("/stats/create", function (req, res) {
  let data = req.body;

  query1 = `DELETE FROM Stats WHERE statID = "${data.statID}";`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Player's Stats Deleted");
      res.sendStatus(200);
    }
  });
});
  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
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

>>>>>>> Stashed changes
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
