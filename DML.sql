-- Query for select, insert, delete, and update functionality with 
-- colon : character being used to denote the variables that will have data from
-- the backend programming language

-----------------------------------------------------
/*

SELECT Queries

*/

-- Retrieve ALL Teams
SELECT * FROM Teams;

-- Get Team's name and city by teamID
SELECT teamName as name, city FROM Teams WHERE teamID = :teamIDInput;

-- Retrieve ALL Players
SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID;

-- Retrieve ALL Players by teamID
SELECT playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Teams.teamID = :teamIDInput;

-- Retrieve ALL Players by position
SELECT playerID as ID, Teams.teamName as team, playerName as name, playerHeight as height, playerPosition as position, playerNumber as number FROM Players JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.playerPosition = "point guard";

-- Retrieve all Player Stats 
SELECT Games.date as Date, Players.playerName as Name,
point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FGM/FGA', CONCAT(ftMake, '/', ftAttempt) as 'FTM/FTA', CONCAT(threePointMake, '/', threePointAttempt) as '3PTM/3PTA', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
FROM PlayersGamesStats 
JOIN Players ON PlayersGamesStats.playerID = Players.playerID
JOIN Games ON PlayersGamesStats.gameID = Games.gameID;

-- Retrieve all stats by playerName
SELECT Games.date as Date,
point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FGM/FGA', CONCAT(ftMake, '/', ftAttempt) as 'FTM/FTA', CONCAT(threePointMake, '/', threePointAttempt) as '3PTM/3PTA', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
FROM PlayersGamesStats 
JOIN Players ON PlayersGamesStats.playerID = Players.playerID
JOIN Games ON PlayersGamesStats.gameID = Games.gameID
WHERE Players.playerName = :playerNameInput;

-- Retrieve all stats by playerID and gameID
SELECT statID, point as points, assist as assists, rebound as rebounds, CONCAT(fgMake, '/', fgAttempt) as fieldGoals, CONCAT(ftMake, '/', ftAttempt) as freeThrows, CONCAT(threePointMake, '/', threePointAttempt) as threePoints, block as blocks, steal as steals, playerFoul as fouls, playerMinute as minutes 
FROM PlayersGamesStats WHERE playerID = :playerIDInput AND gameID = :gameIDInput;

-- Retrieve ALL Coaches
SELECT coachID as ID, teamName as Team, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses FROM Coaches JOIN Teams ON Coaches.teamID = Teams.teamID;

-- Retrieve Coach by teamID
SELECT coachID as ID, teamName as Team, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses FROM Coaches JOIN Teams ON Coaches.teamID = Teams.teamID WHERE Coaches.teamID = :teamIDInput;

-- Retrieve All Games information including the home and away team with scores
SELECT Games.gameID as ID, Games.date as Date, H.teamName as 'Home Team', Games.homeTeamScore as 'Home Score', A.teamName as 'Away Team', Games.awayTeamScore as 'Away Score'
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID;

-- Retrieve Game information including the home and away team with scores by gameID
SELECT Games.gameID as ID, Games.date as Date, H.teamName as 'Home Team', Games.homeTeamScore as 'Home Score', A.teamName as 'Away Team', Games.awayTeamScore as 'Away Score'
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID
WHERE Games.gameID = :gameIDInput;

-- Retrieve ALL Games by teamID
SELECT * FROM Games JOIN TeamsGames ON Games.gameID = TeamsGames.gameID WHERE TeamsGames.teamID = :teamIDInput;

-- Retrieve all player stats by teamID and gameID
SELECT 
    PlayersGamesStats.statID,
    Games.gameID,
    Players.playerName AS playerName,
    PlayersGamesStats.point AS points,
    PlayersGamesStats.assist AS assists,
    PlayersGamesStats.rebound AS rebounds,
    CONCAT(PlayersGamesStats.fgMake, '/', PlayersGamesStats.fgAttempt) AS fieldGoals,
    CONCAT(PlayersGamesStats.ftMake, '/', PlayersGamesStats.ftAttempt) AS freeThrows,
    CONCAT(PlayersGamesStats.threePointMake, '/', PlayersGamesStats.threePointAttempt) AS threePoints,
    PlayersGamesStats.block AS blocks,
    PlayersGamesStats.steal AS steals,
    PlayersGamesStats.playerFoul AS fouls,
    PlayersGamesStats.playerMinute AS minutes
FROM 
    Players
JOIN 
    PlayersGamesStats ON Players.playerID = PlayersGamesStats.playerID
JOIN 
    Teams ON Players.teamID = Teams.teamID
JOIN 
    Games ON PlayersGamesStats.gameID = Games.gameID
WHERE 
    Teams.teamID = :teamIDinput and Games.gameID = :gameIDInput

-----------------------------------------------------

/*


INSERT/UPDATE/DELETE For each Table


*/

-- Inserting a new team 

INSERT INTO Teams (teamName, city)
VALUES (:teamNameInput, :cityInput);


--Deleting a team

DELETE FROM Teams WHERE teamID = :teamIDInput;

--Updating a team 
UPDATE Teams 
SET teamName = :teamNameInput, city = :cityInput 
WHERE teamID = :teamIDInput;

-----------------------------------------------------


--Inserting a player

INSERT INTO Players(playerName, playerHeight, playerPosition, playerNumber, teamID)
VALUES (:playerNameInput, :playerHeightInput, :playerPositionInput, :playerNumberInput, :teamIDInput);

--Deleting a player
DELETE FROM Players WHERE playerID = :playerIDInput;

--Updating a player
UPDATE Players
SET playerName = :playerNameInput, playerHeight = :playerHeightInput, playerPosition = :playerPositionInput, playerNumber = :playerNumberInput, teamID = :teamIDInput
WHERE coachID = :coachIDInput;
-----------------------------------------------------

-- Inserting a new coach

INSERT INTO Coaches(coachName, coachStyle, yearsEXP, totalWin, totalLoss, teamID)
VALUES (:coachNameInput, :coachStyleInput, :yearsEXPInput, :totalWinInput, :totalLossInputs, :teamIDInput);

--Deleting a coach 
DELETE FROM Coaches WHERE coachID = :coachIDInput;

--Updating a coach

UPDATE Coaches
SET coachName = :coachNameInput, coachStyle = :coachStyleInput, yearsEXP = :yearsEXPInput, totalWin = :totalWinInput, totalLoss = :totalLossInputs, teamID = :teamIDinput
WHERE coachID = :coachIDInput;


-----------------------------------------------------

--Inserting a new game

INSERT INTO Games(date, homeTeamScore, awayTeamScore)
VALUES (:dateInput, :homeTeamScoreInput, :awayTeamScoreInput);

--Deleting a game
DELETE FROM Games WHERE gameID = :gameIDinput;

--Updating a game
UPDATE Games
SET date = :dateInput, homeTeamScore = :homeTeamScoreInput, awayTeamScore = :awayTeamScoreInput
WHERE gameID = :gameIDInput;
-----------------------------------------------------

--Inserting a player's game stats

INSERT INTO PlayersGamesStats(gameID, playerID, assist, point, rebound, fgAttempt, fgMake, ftAttempt, ftMake, threePointAttempt, threePointMake, block, steal, playerFoul, playerMinute)
VALUES (:gameIDInput, :playerIDInput, :assistInput, :pointInput, :reboundInput, :fgAttemptInput, :fgMakeInput, :ftAttemptInput, :ftMakeInput, :threePointAttemptInput, :threePointMakeInput, :blockInput, :stealInput, :playerFoulInput, :playerMinuteInput);


--Deleting a player's game stats 
DELETE FROM PlayersGamesStats WHERE playerID = :playerIDInput;

--Updating a player's game stats
UPDATE PlayersGamesStats
SET gameID = :gameIDInput, playerID = :playerIDInput, assist = :assistInput, point = :pointInput, rebound = :reboundInput, fgAttempt = :fgAttemptInput, fgMake = :fgMakeInput, ftAttempt = :ftAttemptInput, ftMake = :ftMakeInput, threePointAttempt = :threePointMakeInput, threePointMake = :threePointMakeInput, block = :blockInput, steal = :stealInput, playerFoul = :playerFoulInput, playerMinute = :playerMinuteInput 
WHERE gameID = :gameIDinput;
-----------------------------------------------------

--Inserting a team's game

INSERT INTO TeamsGames(gameID, teamID, isHome)
VALUES (:gameIDInput, :teamIDInput, :isHomeInput);

--Deleting a team's game
DELETE FROM TeamsGames WHERE gameID = :gameIDinput;

--Updating a team's games
Update TeamsGames
SET gameID = :gameIDinput, teamID = :teamIDinput, isHome = :isHomeInput
WHERE gameID = :gameIDinput;