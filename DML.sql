/*

Retrieve Queries

*/

-- Retrieve ALL Teams
SELECT * FROM Teams;

-- Get Team's name and city by teamID
SELECT teamName as name, city FROM Teams WHERE teamID = :teamIDInput;

-- Retrieve ALL Players
SELECT * FROM Players;

-- Retrieve ALL Players by teamID
SELECT playerID, playerName as name, playerHeight as height, playerPosition as position, playerNumber as number FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Teams.teamID = :teamIDInput;

-- Retrieve all stats by playerID
SELECT statID, gameID, point as points, assist as assists, rebound as rebounds, CONCAT(fgMake, '/', fgAttempt) as fieldGoals, CONCAT(ftMake, '/', ftAttempt) as freeThrows, CONCAT(threePointMake, '/', threePointAttempt) as threePoints, block as blocks, steal as steals, playerFoul as fouls, playerMinute as minutes 
FROM PlayersGamesStats WHERE playerID = :playerIDInput;

-- Retrieve all stats by playerID and gameID
SELECT statID, point as points, assist as assists, rebound as rebounds, CONCAT(fgMake, '/', fgAttempt) as fieldGoals, CONCAT(ftMake, '/', ftAttempt) as freeThrows, CONCAT(threePointMake, '/', threePointAttempt) as threePoints, block as blocks, steal as steals, playerFoul as fouls, playerMinute as minutes 
FROM PlayersGamesStats WHERE playerID = :playerIDInput AND gameID = :gameIDInput;

-- Retrieve all player stats by teamID and gameID
SELECT statID, TeamsGames.gameID, playerName, point as points, assist as assists, rebound as rebounds, CONCAT(fgMake, '/', fgAttempt) as fieldGoals, CONCAT(ftMake, '/', ftAttempt) as freeThrows, CONCAT(threePointMake, '/', threePointAttempt) as threePoints, block as blocks, steal as steals, playerFoul as fouls, playerMinute as minutes 
FROM PlayersGamesStats 
INNER JOIN Players ON PlayersGamesStats.playerID = Players.playerID
JOIN Teams ON Players.teamID = Teams.teamID
JOIN TeamsGames ON Teams.teamID = TeamsGames.teamID
WHERE Players.teamID = 1 AND TeamsGames.gameID = 1;
-- (THIS ONE ^^)

-- Retrieve ALL Coaches
SELECT * FROM Coaches;

-- Retrieve Coach by teamID
SELECT coachID, teamName as team, coachName as name, coachStyle as style, yearsEXP, totalWin, totalLoss FROM Coaches JOIN Teams ON Coaches.teamID = Teams.teamID WHERE Coaches.teamID = :teamIDInput;

-- Retrieve ALL Games
SELECT * FROM Games;

-- Retrieve ALL Games by teamID
SELECT * FROM Games JOIN TeamsGames ON Games.gameID = TeamsGames.gameID WHERE TeamsGames.teamID = :teamIDInput;

SELECT 
    PlayersGamesStats.statID,
    PlayersGamesStats.gameID,
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
    Teams.teamID = :teamIDinput and PlayersGamesStats.statID = :statIDinput





-- Query for select, insert, delete, and update functionality with 
-- colon : character being used to denote the variables that will have data from
-- the backend programming language

-----------------------------------------------------

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