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
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      // Helper handlebar function to check for equality
      eq: (a, b) => a === b,
      neq: (a, b) => a != b,
    },
  })
); // Create an instance of the handlebars engine to process templates
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
  let query1; // Filters to be applied
  let query2 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;

  // Both queries are empty
  if (
    (req.query.position === undefined || req.query.position === "") &&
    (req.query.teams === undefined || req.query.teams === "")
  ) {
    query1 =
      "SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID;";
  }
  // Check each query
  else {
    // position is undefined, set teams
    if (req.query.position === undefined || req.query.position === "") {
      query1 = `SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.teamID `;
      req.query.teams == "none"
        ? (query1 += "is NULL;")
        : (query1 += `= ${parseInt(req.query.teams)}`);
    } else if (req.query.teams === undefined || req.query.teams === "") {
      query1 = `SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.playerPosition = "${req.query.position}";`;
    } else {
      query1 = `SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.playerPosition = "${req.query.position}" AND Players.teamID `;
      req.query.teams == "none"
        ? (query1 += "is NULL;")
        : (query1 += `= ${parseInt(req.query.teams)}`);
    }
  }

  db.pool.query(query1, function (error, rows, fields) {
    let players = rows;
    db.pool.query(query2, function (error, rows, fields) {
      res.render("players/players", {
        data: players,
        teams: rows,
        pos: req.query.position,
        team: req.query.teams,
      });
    });
  });
});

app.get("/players/create", function (req, res) {
  // Query Teams to use as dropdown
  let query1 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("players/addplayer", { data: rows });
  });
});

app.post("/players/create", function (req, res) {
  let data = req.body;
  let query1 = `INSERT INTO Players(playerName, playerHeight, playerPosition, playerNumber, teamID)
    VALUES ("${data.playerName}", ${parseInt(data.height)}, "${
    data.position
  }", ${parseInt(data.number)}, ${
    data.teamID == "none" ? "NULL" : parseInt(data.teamID)
  });`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Player Added");
      res.sendStatus(200);
    }
  });
});

app.get("/players/edit/:_playerID", function (req, res) {
  // Query to get player information
  let query1 = `SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Players.teamID as teamID, teamName FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE playerID = ${req.params._playerID};`;
  // Query for Team dropdown
  let query2 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log(rows);
      let player = rows;
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render("players/editplayer", { data: player, teams: rows });
        }
      });
    }
  });
});

app.post("/players/edit/:_playerID", function (req, res) {
  let data = req.body;
  query1 = `UPDATE Players
    SET playerName = "${data.playerName}", playerHeight = ${parseInt(
    data.height
  )}, playerPosition = "${data.position}", playerNumber = ${parseInt(
    data.number
  )}, teamID = ${data.teamID == "none" ? "NULL" : parseInt(data.teamID)}
    WHERE playerID = ${req.params._playerID};`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Updated Player");
      res.sendStatus(200);
    }
  });
});

app.delete("/players/delete", function (req, res) {
  let data = req.body;

  query1 = `DELETE FROM Players WHERE playerID = "${data.playerID}";`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Player Deleted");
      res.sendStatus(200);
    }
  });
});

// Coaches ROUTES
app.get("/coaches", function (req, res) {
  let query1 =
    "SELECT coachID as ID, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses, teamName as Team FROM Coaches LEFT JOIN Teams ON Coaches.teamID = Teams.teamID;";
  db.pool.query(query1, function (error, rows, fields) {
    res.render("coaches/coaches", { data: rows });
  });
});

app.get("/coaches/create", function (req, res) {
  // Query Teams to use as dropdown
  let query1 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("coaches/addcoach", { data: rows });
  });
});

app.post("/coaches/create", function (req, res) {
  let data = req.body;
  console.log(data);
  let query1 = `INSERT INTO Coaches(coachName, coachStyle, yearsEXP, totalWin, totalLoss, teamID)
  VALUES ("${data.coachName}", "${data.style}", ${parseInt(
    data.experience
  )}, ${parseInt(data.win)}, ${parseInt(data.loss)}, ${
    data.teamID == "none" ? "NULL" : parseInt(data.teamID)
  });`;

  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Coach Added");
      res.sendStatus(200);
    }
  });
});

app.get("/coaches/edit/:_coachID", function (req, res) {
  // Query to get player information
  let query1 = `SELECT coachID as ID, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses, teamName as teamName, Coaches.teamID as teamID FROM Coaches LEFT JOIN Teams ON Coaches.teamID = Teams.teamID WHERE coachID = ${req.params._coachID};`;
  // Query for Team dropdown
  let query2 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log(rows);
      let coach = rows;
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render("coaches/editcoach", { data: coach, teams: rows });
        }
      });
    }
  });
});

app.post("/coaches/edit/:_coachID", function (req, res) {
  let data = req.body;

  query1 = `UPDATE Coaches
    SET coachName = "${data.coachName}", coachStyle = "${
    data.style
  }", yearsEXP = ${parseInt(data.experience)}, totalWin = ${parseInt(
    data.win
  )}, totalLoss = ${parseInt(data.loss)}, teamID = ${
    data.teamID == "none" ? "NULL" : parseInt(data.teamID)
  }
      WHERE coachID = ${req.params._coachID};`;
  console.log(query1);
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Updated Coach");
      res.sendStatus(200);
    }
  });
});

app.delete("/coaches/delete", function (req, res) {
  let data = req.body;

  query1 = `DELETE FROM Coaches WHERE coachID = "${data.coachID}";`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log("Coach Deleted");
      res.sendStatus(200);
    }
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

app.get("/games/stats/:_gameID", function (req, res) {
  // Get two teamIDs
  let query1 = `SELECT teamID as TeamID FROM TeamsGames WHERE gameID = ${req.params._gameID};`;
  db.pool.query(query1, function (error, rows, fields) {
    let team1ID = rows[0].TeamID;
    let team2ID = rows[1].TeamID;
    let query2 = `SELECT 
    PlayersGamesStats.statID AS ID,
    Players.playerName AS Name,
    PlayersGamesStats.point AS Points,
    PlayersGamesStats.assist AS Assists,
    PlayersGamesStats.rebound AS Rebounds,
    CONCAT(PlayersGamesStats.fgMake, '/', PlayersGamesStats.fgAttempt) AS FieldGoals,
    CONCAT(PlayersGamesStats.ftMake, '/', PlayersGamesStats.ftAttempt) AS FreeThrows,
    CONCAT(PlayersGamesStats.threePointMake, '/', PlayersGamesStats.threePointAttempt) AS ThreePoints,
    PlayersGamesStats.block AS Blocks,
    PlayersGamesStats.steal AS Steals,
    PlayersGamesStats.playerFoul AS Fouls,
    PlayersGamesStats.playerMinute AS Minutes, 
    Teams.teamName as TeamName
FROM 
    Players
JOIN 
    PlayersGamesStats ON Players.playerID = PlayersGamesStats.playerID
JOIN 
    Teams ON Players.teamID = Teams.teamID
JOIN 
    Games ON PlayersGamesStats.gameID = Games.gameID
WHERE 
    Teams.teamID = ${team1ID} and Games.gameID = ${req.params._gameID};`;
    let query3 = `SELECT 
    PlayersGamesStats.statID AS ID,
    Players.playerName AS Name,
    PlayersGamesStats.point AS Points,
    PlayersGamesStats.assist AS Assists,
    PlayersGamesStats.rebound AS Rebounds,
    CONCAT(PlayersGamesStats.fgMake, '/', PlayersGamesStats.fgAttempt) AS FieldGoals,
    CONCAT(PlayersGamesStats.ftMake, '/', PlayersGamesStats.ftAttempt) AS FreeThrows,
    CONCAT(PlayersGamesStats.threePointMake, '/', PlayersGamesStats.threePointAttempt) AS ThreePoints,
    PlayersGamesStats.block AS Blocks,
    PlayersGamesStats.steal AS Steals,
    PlayersGamesStats.playerFoul AS Fouls,
    PlayersGamesStats.playerMinute AS Minutes, 
    Teams.teamName as TeamName
FROM 
    Players
JOIN 
    PlayersGamesStats ON Players.playerID = PlayersGamesStats.playerID
JOIN 
    Teams ON Players.teamID = Teams.teamID
JOIN 
    Games ON PlayersGamesStats.gameID = Games.gameID
WHERE 
    Teams.teamID = ${team2ID} and Games.gameID = ${req.params._gameID};`;

    db.pool.query(query2, function (error, rows, fields) {
      let team1 = rows;
      db.pool.query(query3, function (error, rows, fields) {
        res.render("games/info", { team1: team1, team2: rows });
      });
    });
  });
});

app.get("/games/create", function (req, res) {
  // Query Teams to use as dropdown
  let query1 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("games/addgame", { data: rows });
  });
});

app.post("/games/create", function (req, res) {
  let data = req.body;
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
      res.sendStatus(200);
    }
  });
});

// Stats ROUTES

// SELECT
app.get("/stats", function (req, res) {
  let query1;
  if (req.query.pname === undefined || req.query.pname === "") {
    query1 = `SELECT PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
    point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FieldGoals', CONCAT(ftMake, '/', ftAttempt) as 'FreeThrows', CONCAT(threePointMake, '/', threePointAttempt) as 'ThreePoints', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
    FROM PlayersGamesStats 
    JOIN Players ON PlayersGamesStats.playerID = Players.playerID
    JOIN Games ON PlayersGamesStats.gameID = Games.gameID;`;
  } else {
    query1 = `SELECT PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
    point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FieldGoals', CONCAT(ftMake, '/', ftAttempt) as 'FreeThrows', CONCAT(threePointMake, '/', threePointAttempt) as 'ThreePoints', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
    FROM PlayersGamesStats 
    JOIN Players ON PlayersGamesStats.playerID = Players.playerID
    JOIN Games ON PlayersGamesStats.gameID = Games.gameID 
    WHERE Players.playerName LIKE "${req.query.pname}";`;
  }
  let query2 = `SELECT teamID as ID, teamName as Name, city as City FROM Teams;`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      // Map the data to format the date
      let formattedData = rows.map((row) => ({
        ...row,
        Date: row.Date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
      db.pool.query(query2, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render("stats/stats", { data: formattedData, teams: rows });
        }
      });
    }
  });
});

app.get("/stats/create", function (req, res) {
  let query1 = `SELECT Games.gameID as ID, Games.date as Date, H.teamName as 'HomeTeam', H.teamID as 'HomeID', Games.homeTeamScore as 'HomeScore', A.teamName as 'AwayTeam', A.teamID as 'AwayID', Games.awayTeamScore as 'AwayScore'
  FROM Games
  JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
  JOIN Teams H ON Home.teamID = H.teamID
  JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
  JOIN Teams A ON Away.teamID = A.teamID`;

  if (req.query.game === undefined) {
    query1 += ";";
    // Query Games to use as dropdown
    db.pool.query(query1, function (error, rows, fields) {
      let formattedData = rows.map((row) => ({
        ...row,
        Date: row.Date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
      res.render("stats/addstat", { games: formattedData, gamePicked: false });
    });
  }
  // Game is picked
  else {
    query1 += ` WHERE Games.gameID = ${parseInt(req.query.game)};`;
    // Use gameID to get players for both Teams
    db.pool.query(query1, function (error, rows, fields) {
      let formattedData = rows.map((row) => ({
        ...row,
        Date: row.Date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));

      // Get players from both Teams
      let query2 = `SELECT playerID as ID, playerName as Name FROM Players where teamID = ${parseInt(
        formattedData[0].HomeID
      )} or teamID = ${parseInt(formattedData[0].AwayID)};`;
      db.pool.query(query2, function (error, rows, fields) {
        res.render("stats/addstat", {
          games: formattedData,
          gamePicked: true,
          players: rows,
        });
      });
    });
  }
});

app.post("/stats/create", function (req, res) {
  let data = req.body;

  // Adding new stats
  let query1 = `INSERT INTO PlayersGamesStats(gameID, playerID, assist, point, rebound, fgAttempt, fgMake, ftAttempt, ftMake, threePointAttempt, threePointMake, block, steal, playerFoul, playerMinute)
            VALUES ("${data.gameID}", "${data.playerID}", "${parseInt(
    data.assist
  )}", "${parseInt(data.point)}", "${parseInt(data.rebound)}", "${parseInt(
    data.fieldGoalAttempt
  )}", "${parseInt(data.fieldGoalMake)}", "${parseInt(
    data.freeThrowAttempt
  )}", "${parseInt(data.freeThrowMake)}", "${parseInt(
    data.threePointAttempt
  )}", "${parseInt(data.threePointMake)}", "${parseInt(
    data.block
  )}", "${parseInt(data.steal)}", "${parseInt(data.foul)}", "${parseInt(
    data.minute
  )}")`;

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

app.get("/stats/edit/:_statID", function (req, res) {
  // Query Stat to edit using _statID
  let query1 = `SELECT PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
  point as Points, assist as Assists, rebound as Rebounds, fgMake, fgAttempt, ftMake, ftAttempt,threePointMake, threePointAttempt, block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
  FROM PlayersGamesStats 
  JOIN Players ON PlayersGamesStats.playerID = Players.playerID
  JOIN Games ON PlayersGamesStats.gameID = Games.gameID
  WHERE PlayersGamesStats.statID = ${parseInt(req.params._statID)}`;
  db.pool.query(query1, function (error, rows, fields) {
    res.render("stats/editstat", { data: rows });
  });
});

app.post("/stats/edit/:_statID", function (req, res) {
  let data = req.body;

  // Updating stats
  query1 = `UPDATE PlayersGamesStats
            SET assist = "${parseInt(data.assist)}", point = "${parseInt(
    data.point
  )}", rebound = "${parseInt(data.rebound)}",fgMake = "${parseInt(
    data.fieldGoalMake
  )}", fgAttempt = "${parseInt(data.fieldGoalAttempt)}", ftMake = "${parseInt(
    data.freeThrowMake
  )}", ftAttempt = "${parseInt(data.freeThrowAttempt)}", 
  threePointMake = "${parseInt(
    data.threePointMake
  )}", threePointAttempt = "${parseInt(
    data.threePointAttempt
  )}", block = "${parseInt(data.block)}", steal = "${parseInt(
    data.steal
  )}", playerFoul = "${parseInt(data.foul)}", playerMinute = "${parseInt(
    data.minute
  )}"
  WHERE statID = "${req.params._statID}"`;

  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// Deleting Stats
app.delete("/stats/delete", function (req, res) {
  let data = req.body;

  query1 = `DELETE FROM PlayersGamesStats WHERE statID = "${data.statID}";`;
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
