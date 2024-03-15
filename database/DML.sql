-- Query for select, insert, delete, and update functionality with 
-- colon : character being used to denote the variables that will have data from
-- the backend programming language

-----------------------------------------------------
/*

SELECT Queries

*/

-- Get all Teams for dropdowns
SELECT 
    teamID as ID, teamName as Name, city as City FROM Teams;

-- Get ALL Players
SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID;

-- Get All Players by TeamID
SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.teamID;

-- Get All Players by position
SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.playerPosition = :positionInput

-- Get All Players by TeamID and position
SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.playerPosition = :positionInput AND Players.teamID

-- Get Player by Player's ID
SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Players.teamID as teamID, teamName FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE playerID = :playerIDinput

-- Get All Coaches and Team
SELECT 
    coachID as ID, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses, teamName as Team FROM Coaches LEFT JOIN Teams ON Coaches.teamID = Teams.teamID

-- Get Coach by Coach's ID
SELECT 
    coachID as ID, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses, teamName as teamName, Coaches.teamID as teamID FROM Coaches LEFT JOIN Teams ON Coaches.teamID = Teams.teamID WHERE coachID = :coachIDinput;

-- Get Team by Team's ID
SELECT 
    teamID as ID, teamName as Name, city as City FROM Teams WHERE teamID = :teamIDinput;

-- Get All Game's data with Home and Away Team data
SELECT 
    Games.gameID as ID, Games.date as Date, H.teamName as 'HomeTeam', Games.homeTeamScore as 'HomeScore', A.teamName as 'AwayTeam', Games.awayTeamScore as 'AwayScore'
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID;

-- Get the two teams that are part of Game's ID
SELECT 
    teamID as TeamID FROM TeamsGames WHERE gameID = :gameIDinput;

-- Get all Player's Stats from specified Team ID and Game ID
SELECT 
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
    Teams.teamID = :team1IDinput and Games.gameID = :gameIDinput;

-- Get Game information by Game ID
SELECT 
    Games.gameID as ID, Games.date as Date, H.teamName as HomeTeam, H.teamID as HomeTeamID, 
    Games.homeTeamScore as HomeScore, A.teamName as AwayTeam, A.teamID as AwayTeamID, Games.awayTeamScore as AwayScore
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID
WHERE Games.gameID = :gameIDinput;

-- Get All PlayersGamesStats
SELECT 
    PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
    point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FieldGoals', CONCAT(ftMake, '/', ftAttempt) as 'FreeThrows', CONCAT(threePointMake, '/', threePointAttempt) as 'ThreePoints', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
    FROM PlayersGamesStats 
    JOIN Players ON PlayersGamesStats.playerID = Players.playerID
    JOIN Games ON PlayersGamesStats.gameID = Games.gameID;

-- Filter PlayersGamesStats by playerName
SELECT PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
    point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FieldGoals', CONCAT(ftMake, '/', ftAttempt) as 'FreeThrows', CONCAT(threePointMake, '/', threePointAttempt) as 'ThreePoints', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
    FROM PlayersGamesStats 
    JOIN Players ON PlayersGamesStats.playerID = Players.playerID
    JOIN Games ON PlayersGamesStats.gameID = Games.gameID 
    WHERE Players.playerName LIKE  :playerNameInput;

-- Get All Game's information
SELECT 
    Games.gameID as ID, Games.date as Date, H.teamName as 'HomeTeam', H.teamID as 'HomeID', Games.homeTeamScore as 'HomeScore', A.teamName as 'AwayTeam', A.teamID as 'AwayID', Games.awayTeamScore as 'AwayScore'
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID;

-- Find players from two different Team ID
SELECT 
    playerID as ID, playerName as Name FROM Players where teamID =  :homeIDInput or teamID =  :awayIDInput

-- Get Player's PlayersGamesStats with Stat ID
SELECT 
    PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
    point as Points, assist as Assists, rebound as Rebounds, fgMake, fgAttempt, ftMake, ftAttempt,threePointMake, threePointAttempt, block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
FROM PlayersGamesStats 
JOIN Players ON PlayersGamesStats.playerID = Players.playerID
JOIN Games ON PlayersGamesStats.gameID = Games.gameID
WHERE PlayersGamesStats.statID =  :statIDInput


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
WHERE playerID = :playerIDInput;
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