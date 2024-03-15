-- Query for select, insert, delete, and update functionality with 
-- colon : character being used to denote the variables that will have data from
-- the backend programming language

-----------------------------------------------------
/*

SELECT Queries

*/

/* SELECTS Team Table */
SELECT 
    teamID as ID, teamName as Name, city as City FROM Teams;

SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID;

SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.teamID;

SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.playerPosition = :positionInput

SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Teams.teamName as Team FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE Players.playerPosition = :positionInput AND Players.teamID

SELECT 
    playerID as ID, playerName as Name, playerHeight as Height, playerPosition as Position, playerNumber as Number, Players.teamID as teamID, teamName FROM Players LEFT JOIN Teams ON Players.teamID = Teams.teamID WHERE playerID = :playerIDinput

SELECT 
    teamID as ID, teamName as Name, city as City FROM Teams

SELECT 
    coachID as ID, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses, teamName as Team FROM Coaches LEFT JOIN Teams ON Coaches.teamID = Teams.teamID

SELECT 
    coachID as ID, coachName as Name, coachStyle as Style, yearsEXP as Experience, totalWin as Wins, totalLoss as Losses, teamName as teamName, Coaches.teamID as teamID FROM Coaches LEFT JOIN Teams ON Coaches.teamID = Teams.teamID WHERE coachID = :coachIDinput;

SELECT 
    teamID as ID, teamName as Name, city as City FROM Teams WHERE teamID = :teamIDinput;

SELECT 
    Games.gameID as ID, Games.date as Date, H.teamName as 'HomeTeam', Games.homeTeamScore as 'HomeScore', A.teamName as 'AwayTeam', Games.awayTeamScore as 'AwayScore'
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID;

SELECT 
    teamID as TeamID FROM TeamsGames WHERE gameID = :gameIDinput;

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
    Teams.teamID =  :team1IDinput and Games.gameID = :gameIDinput;

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
    Teams.teamID = :team2IDInput and Games.gameID = :gameIDInput;


SELECT 
    Games.gameID as ID, Games.date as Date, H.teamName as HomeTeam, H.teamID as HomeTeamID, 
    Games.homeTeamScore as HomeScore, A.teamName as AwayTeam, A.teamID as AwayTeamID, Games.awayTeamScore as AwayScore
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID
WHERE Games.gameID = :gameIDinput;



SELECT 
    PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
    point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FieldGoals', CONCAT(ftMake, '/', ftAttempt) as 'FreeThrows', CONCAT(threePointMake, '/', threePointAttempt) as 'ThreePoints', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
    FROM PlayersGamesStats 
    JOIN Players ON PlayersGamesStats.playerID = Players.playerID
    JOIN Games ON PlayersGamesStats.gameID = Games.gameID;

SELECT PlayersGamesStats.statID as ID, PlayersGamesStats.gameID, PlayersGamesStats.playerID, Games.date as Date, Players.playerName as Name,
    point as Points, assist as Assists, rebound as Rebounds, CONCAT(fgMake, '/', fgAttempt) as 'FieldGoals', CONCAT(ftMake, '/', ftAttempt) as 'FreeThrows', CONCAT(threePointMake, '/', threePointAttempt) as 'ThreePoints', block as Blocks, steal as Steals, playerFoul as Fouls, playerMinute as Minutes 
    FROM PlayersGamesStats 
    JOIN Players ON PlayersGamesStats.playerID = Players.playerID
    JOIN Games ON PlayersGamesStats.gameID = Games.gameID 
    WHERE Players.playerName LIKE  :playerNameInput;

SELECT 
    Games.gameID as ID, Games.date as Date, H.teamName as 'HomeTeam', H.teamID as 'HomeID', Games.homeTeamScore as 'HomeScore', A.teamName as 'AwayTeam', A.teamID as 'AwayID', Games.awayTeamScore as 'AwayScore'
FROM Games
JOIN TeamsGames Home ON Games.gameID  = Home.gameID AND Home.isHome = True
JOIN Teams H ON Home.teamID = H.teamID
JOIN TeamsGames Away ON Games.gameID  = Away.gameID AND Away.isHome = False
JOIN Teams A ON Away.teamID = A.teamID;

SELECT 
    playerID as ID, playerName as Name FROM Players where teamID =  :homeIDInput or teamID =  :awayIDInput

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