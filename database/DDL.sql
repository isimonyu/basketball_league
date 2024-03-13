/* 
Citation for the Data for PlayersGamesStats
Date: 02/06/2024
Stats are sourced from the following links: 
Game 1 - https://www.espn.com/nba/boxscore/_/gameId/401585343 
Game 2 - https://www.espn.com/nba/boxscore/_/gameId/401585270 
Game 3 - https://www.espn.com/nba/boxscore/_/gameId/401585344
Game 4 - https://www.espn.com/nba/boxscore/_/gameId/401585247
Game 5 - https://www.espn.com/nba/boxscore/_/gameId/401585248
Game 6 - https://www.espn.com/nba/boxscore/_/gameId/401585160
*/

-- Set FK Checks off to drop tables
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Drops tables if they already exist in the DB
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Coaches;
DROP TABLE IF EXISTS Games;
DROP TABLE IF EXISTS TeamsGames;
DROP TABLE IF EXISTS PlayersGamesStats;

/* 

    Create Tables

*/

CREATE TABLE Teams (
    teamID INT AUTO_INCREMENT UNIQUE NOT NULL,
    teamName varchar(70) UNIQUE NOT NULL,
    city varchar(70) NOT NULL,
    PRIMARY KEY (teamID)
);

CREATE TABLE Players (
    playerID int AUTO_INCREMENT UNIQUE NOT NULL,
    playerName varchar(70) NOT NULL,
    playerHeight int NOT NULL,
    playerPosition varchar(70) NOT NULL,
    playerNumber int NOT NULL,
    teamID int default NULL,
    PRIMARY KEY (playerID),
    FOREIGN KEY (teamID) REFERENCES Teams(teamID) 
    ON DELETE CASCADE
);

CREATE TABLE Coaches (
    coachID int AUTO_INCREMENT UNIQUE NOT NULL,
    coachName varchar(70) NOT NULL,
    coachStyle varchar(70) NOT NULL,
    yearsEXP int NOT NULL,
    totalWin int NOT NULL,
    totalLoss int NOT NULL,
    teamID int default NULL,
    PRIMARY KEY (coachID),
    FOREIGN KEY (teamID) REFERENCES Teams(teamID) 
    ON DELETE CASCADE
);

CREATE TABLE Games(
    gameID int AUTO_INCREMENT UNIQUE NOT NULL,
    date date NOT NULL,
    homeTeamScore int NOT NULL,
    awayTeamScore int NOT NULL,
    PRIMARY KEY (gameID)
);

CREATE TABLE PlayersGamesStats(
    statID int AUTO_INCREMENT UNIQUE NOT NULL,
    gameID int,
    playerID int,
    assist int NOT NULL default 0,
    point int NOT NULL default 0,
    rebound int NOT NULL default 0,
    fgAttempt int NOT NULL default 0,
    fgMake int NOT NULL default 0,
    ftAttempt int NOT NULL default 0,
    ftMake int NOT NULL default 0,
    threePointAttempt int NOT NULL default 0,
    threePointMake int NOT NULL default 0,
    block int NOT NULL default 0,
    steal int NOT NULL default 0,
    playerFoul int NOT NULL default 0,
    playerMinute int NOT NULL default 0,
    PRIMARY KEY (statID),
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
    ON DELETE CASCADE,
    FOREIGN KEY (playerID) REFERENCES Players(playerID)
    ON DELETE CASCADE
);

CREATE TABLE TeamsGames(
    teamGameID int AUTO_INCREMENT UNIQUE NOT NULL,
    gameID int NOT NULL,
    teamID int NOT NULL,
    isHome bool not NULL,
    PRIMARY KEY (teamGameID),
    FOREIGN KEY (gameID) REFERENCES Games(gameID)
    ON DELETE CASCADE,
    FOREIGN KEY (teamID) REFERENCES Teams(teamID)
    ON DELETE CASCADE
);




/* 

    INSERTS

*/


INSERT INTO Teams(teamName, city)
VALUES ('Wizards', 'Washington'),
    ('Raptors', 'Toronto'),
    ('Spurs', 'San Antonio'),
    ('Rockets', 'Houston'),
    ('Golden State Warriors', 'San Francisco'),
    ('Ballers', 'Los Angeles');


INSERT INTO Players(playerName, playerHeight, playerPosition, playerNumber, teamID)
VALUES 
('John Ball', 73, 'Point Guard', 2, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Jordan Green', 75, 'Shooting Guard', 13, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Lonzo Call', 78, 'Power Forward', 0, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Paul Blunt', 81, 'Center', 35, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Bradley Deal', 78, 'Small Forward', 3, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Alex Lin', 74, 'Point Guard', 6, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Jalen Red', 76, 'Shooting Guard', 7, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Brooks Dillon', 86, 'Center', 20, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Myles Straight', 83, 'Shooting Guard', 17, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Mikal Road', 77, 'Center', 21, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Kyrie Irvine', 71, 'Power Forward', 22, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Bam Thomas', 78, 'Center', 30, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Ha Morant', 82, 'Shooting Guard', 1, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Patrick Herro', 82, 'Center', 4, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Lebron Barnes', 76, 'Power Forward', 6, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Clint Howard', 81, 'Small Forward', 9, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Spurs')),
('Kyle Terry', 77, 'Point Guard', 5, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Spurs')),
('Lamar Bradley', 91, 'Shooting Guard', 41, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Spurs')),
('Duncan Park', 84, 'Center', 2, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Spurs')),
('Bruce Hood', 70, 'Point Guard', 1, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Spurs')),
('David Olynyk', 73, 'Power Forward', 9, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Spurs')),
('Eric Jones', 72, 'Shooting Guard', 7, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Josh Washington', 79, 'Center', 15, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Ben Conley', 71, 'Small Forward', 23, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Bradley Seal', 74, 'Point Guard', 32, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Demar Zubac', 78, 'Small Forward', 24, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Klay Porter', 80, 'Power Forward', 8, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Dennis Roader', 71, 'Shooting Guard', 5, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Stephen Curry', 74, 'Shooting Guard', 30, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Golden State Warriors')),
('Scottie Watanabe', 78, 'Small Forward', 7, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Golden State Warriors')),
('Trevor Maxey', 80, 'Point Guard', 5, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Golden State Warriors')),
('Dennis Schroder', 69, 'Power Forward', 23, (SELECT Teams.teamID FROM Teams WHERE Teams.teamName = 'Golden State Warriors')),
('Jay Brunson', 76, 'Small Forward', 32, NULL),
('Kris Suggs', 81, 'Center', 3, NULL),
('Joseph Wagner', 72, 'Shooting Guard', 1, NULL),
('Mark Lee', 81, 'Point Guard', 41, NULL);


INSERT INTO Coaches(coachName, coachStyle, yearsEXP, totalWin, totalLoss, teamID)
VALUES 
('Mike Nurse', 'Triangle', 3, 10, 20, (SELECT teamID FROM Teams WHERE Teams.teamName = 'Wizards')),
('Joe Louis', 'Box and 1', 5, 20, 10, (SELECT teamID FROM Teams WHERE Teams.teamName = 'Raptors')),
('Pop Greg', 'Motion', 30, 100, 40, (SELECT teamID FROM Teams WHERE Teams.teamName = 'Spurs')),
('Alex Barnes', '1-3-1', 15, 60, 20, (SELECT teamID FROM Teams WHERE Teams.teamName = 'Rockets')),
('Jeff Green', 'Princeton', 20, 80, 60, (SELECT teamID FROM Teams WHERE Teams.teamName = 'Golden State Warriors')),
('Doc Stream', 'Wing', 20, 80, 60, NULL);


INSERT INTO Games(date, homeTeamScore, awayTeamScore)
VALUES
('2023-01-12', 81, 57),
('2023-01-13', 120, 81),
('2023-01-19', 110, 98),
('2023-01-20', 98, 74),
('2023-01-26', 106, 70),
('2023-01-27', 88, 60);


INSERT INTO TeamsGames(gameID, teamID, isHome)
VALUES
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Wizards'), True),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Spurs'), False),

((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Raptors'), True),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Rockets'), False),

((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Wizards'), True),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Rockets'), False),

((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Raptors'), True),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Spurs'), False),

((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Raptors'), True),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Wizards'), False),

((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Spurs'), True),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT teamID FROM Teams WHERE Teams.teamName = 'Rockets'), False);

INSERT INTO PlayersGamesStats(gameID, playerID, playerMinute, fgMake, fgAttempt, threePointMake, threePointAttempt, ftMake, ftAttempt, rebound, assist, steal, block, playerFoul, point)
VALUES 
-- Game 1 Wizards v Spurs
-- Wizards players https://www.espn.com/nba/boxscore/_/gameId/401585343
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'John Ball'), 28, 6, 8, 2, 4, 0, 0, 4, 5, 0, 1, 0, 14),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Jordan Green'), 15, 2, 7, 0, 4, 1, 2, 2, 1, 0, 0, 1, 5),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Lonzo Call'), 35, 10, 17, 2, 3, 1, 1, 5, 8, 2, 1, 4, 23),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Paul Blunt'), 32, 6, 9, 4, 7, 4, 4, 6, 4, 2, 0, 0, 20),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bradley Deal'), 36, 6, 15, 4, 10, 3, 5, 8, 3, 1, 0, 3, 19),

-- Spurs players
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Clint Howard'), 35, 8, 11, 1, 1, 0, 0, 6, 6, 2, 1, 2, 17),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Kyle Terry'), 12, 1,4, 0, 2, 2, 2, 5, 0, 0, 0, 3, 4),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Lamar Bradley'), 22, 1, 6, 0, 1, 0, 0, 6, 0, 0,1, 0, 2),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Duncan Park'), 33, 6, 16, 1, 5, 2, 3, 2, 7, 0, 0, 4, 15),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-12'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bruce Hood'), 32, 7, 17, 2, 7, 3, 5, 6, 0, 1, 0, 3, 19),


-- Game 2 Raptors v Rockets
-- Raptors  players https://www.espn.com/nba/boxscore/_/gameId/401585270
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Brooks Dillon'), 32, 13, 27, 3, 13, 1, 2, 6, 4, 1, 1, 1, 30),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Myles Straight'), 24, 4, 8, 1, 1, 1, 2, 5, 2, 0, 1, 3, 10),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Mikal Road'), 28, 7, 10, 0, 0, 1, 2, 13, 1, 7, 4, 3, 35),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Kyrie Irvine'), 30, 5, 12, 1, 4, 1, 1, 4, 3, 7, 1, 1, 12),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bam Thomas'), 29, 6, 12, 3, 6, 2, 2, 4, 3, 7, 4, 3, 33),

-- Rockets players
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Eric Jones'), 36, 10, 19, 4, 10, 6, 7, 3, 3, 1, 0, 1, 30),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Josh Washington'), 32, 3, 7, 0, 2, 5, 6, 7, 2, 0, 0, 2, 11),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Ben Conley'), 36, 5, 6, 0, 0, 0, 0, 18, 3, 0, 0, 4, 10),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bradley Seal'), 35, 7, 17, 2, 3, 4, 6, 4, 12, 0, 0, 3, 20),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Demar Zubac'), 26, 4, 8, 2, 3, 0, 0, 4, 1, 0, 2, 3, 10),

-- Game 3 Wizards v Rockets
-- Wizards players https://www.espn.com/nba/boxscore/_/gameId/401585344
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'John Ball'), 32, 7, 13, 3, 5, 1, 2, 3, 5, 2, 0, 3, 18),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Jordan Green'), 37, 13, 20, 5, 8, 5, 5, 2, 5, 1, 1, 2, 36),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Lonzo Call'), 21, 3, 5, 0, 0, 2, 4, 9, 3, 1, 1, 0, 8),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Paul Blunt'), 39, 7, 14, 6, 9, 10, 10, 8, 10, 2, 1, 3, 30),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bradley Deal'), 21, 4, 4, 1, 1, 0, 0, 1, 2, 0, 0, 2, 9),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Jalen Red'), 20, 4, 7, 1, 1, 0, 0, 8, 2, 0, 0, 3, 9),

-- Rockets players
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Eric Jones'), 34, 8, 10, 2, 2, 0, 0, 5, 0, 0, 1, 4, 18),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Josh Washington'), 33, 5, 8, 3, 6, 5, 5, 5, 0, 1, 0, 1, 18),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Ben Conley'), 37, 3, 14, 1, 3, 2, 3, 7, 5, 0, 1, 4, 9),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bradley Seal'), 36, 8, 14, 3, 7, 6, 6, 2, 12, 2, 0, 5, 25),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Demar Zubac'), 34, 7, 18, 3, 7, 4, 5, 5, 7, 0, 0, 1, 21),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-19'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Klay Porter'), 14, 3, 6, 0, 0, 1, 3, 4, 1, 0, 2, 1, 7),


-- Game 4 Raptors vs Spurs 98 - 74
-- Raptors players https://www.espn.com/nba/boxscore/_/gameId/401585247
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Brooks Dillon'), 39, 8, 17, 5, 10, 2, 3, 7, 4, 0, 1, 4, 23),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Myles Straight'), 25, 1, 4, 0, 2, 3, 4, 3, 3, 1, 0, 2, 5),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Mikal Road'), 41, 7, 21, 3, 9, 3, 4, 10, 2, 2, 0, 1, 20),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Kyrie Irvine'), 27, 9, 13, 0, 0, 3, 4, 10, 0, 0, 1, 1, 21),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bam Thomas'), 32, 6, 21, 1, 8, 4, 4, 4, 7, 1, 0, 6, 17),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Ha Morant'), 29, 4, 6, 4, 6, 0, 0, 6, 5, 1, 1, 4, 12),

-- Spurs players
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Clint Howard'), 33, 12, 23, 5, 10, 5, 6, 4, 4, 0, 0, 1, 34),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Kyle Terry'), 34, 4, 8, 1, 2, 2, 4, 8, 2, 1, 0, 3, 11),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Lamar Bradley'), 22, 7, 9, 0, 0, 0, 1, 8, 2, 0, 0, 3, 14),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Duncan Park'), 22, 4, 10, 1, 3, 0, 0, 1, 2, 1, 0, 2, 9),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-20'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bruce Hood'), 27, 2, 3, 1, 2, 1, 3, 7, 8, 0, 0, 1, 6),


-- Game 5 Raptors v Wizards 106 - 70
-- Raptors  players https://www.espn.com/nba/boxscore/_/gameId/401585248
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Brooks Dillon'), 30, 5, 11, 1, 4, 2, 2, 5, 0, 2, 0, 4, 13),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Myles Straight'), 35, 7, 11, 0, 0, 5, 6, 16, 1, 0, 4, 4, 19),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Mikal Road'), 35, 11, 24, 2, 10, 3, 3, 6, 3, 0, 1, 4, 27),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Kyrie Irvine'), 31, 2, 4, 1, 3, 1, 2, 5, 5, 1, 0, 2, 6),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bam Thomas'), 34, 11, 28, 3, 10, 13, 14, 3, 5, 1, 0, 4, 38),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Lebron Barnes'), 22, 1, 4, 0, 0, 1, 2, 5, 5, 0, 0, 1, 3),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Patrick Herro'), 1, 0, 0, 0, 0 , 0, 0, 0 , 0, 0, 0, 0, 0),

-- Wizards Players
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'John Ball'), 35, 5, 11, 3, 8, 4, 4, 14, 8, 0, 1, 4, 17),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Jordan Green'), 38, 7, 12, 4, 5, 6, 6, 6, 6, 0, 0, 3, 24),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Lonzo Call'), 21, 5, 5, 0, 0, 0, 0, 4, 1, 1, 2, 6, 10),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Paul Blunt'), 32, 2, 7, 0, 2, 1, 2, 2, 6, 0, 0, 1, 5),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bradley Deal'), 28, 2, 11, 1, 4, 2, 2, 2, 3, 0, 0, 3, 7),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-26'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Alex Lin'), 16, 3, 6, 0, 0, 1, 1, 4, 0, 0, 0, 0, 7),


-- Game 6 Spurs v Rockets 88 - 60
-- Spurs players https://www.espn.com/nba/boxscore/_/gameId/401585160
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Clint Howard'), 25, 5, 5, 4, 4, 0, 0, 5, 3, 0, 0, 2, 14),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Kyle Terry'), 36, 14, 25, 3, 7, 6, 6, 7, 3, 3, 0, 0, 37),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Lamar Bradley'), 24, 3, 9, 0, 1, 2, 2, 8, 2, 2, 3, 4, 8),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Duncan Park'), 40, 6, 17, 3, 6, 6, 6, 3, 4, 3, 2, 3, 21),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bruce Hood'), 25, 2, 9, 2, 8, 0, 0, 4, 3, 1, 0, 3, 6),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-27'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'David Olynyk'), 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2),

-- Rockets players
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Eric Jones'), 33, 6, 10, 0, 0, 2, 2, 12, 5, 0, 0, 3, 14),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Josh Washington'), 21, 1, 5, 0, 4, 2, 2, 2, 0, 1, 0, 1, 4),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Ben Conley'), 35, 6, 14, 3, 7, 0, 1, 8, 3, 1, 2, 2, 15),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Bradley Seal'), 38, 5, 15, 2, 7, 9, 11, 5, 4, 1, 0, 2, 21),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Demar Zubac'), 10, 0, 2, 0, 1, 1, 2, 3, 0, 0, 0, 1, 1),
((SELECT Games.gameID FROM Games WHERE Games.date = '2023-01-13'), (SELECT Players.playerID FROM Players WHERE Players.playerName = 'Dennis Roader'),22, 2, 8, 1, 5, 0, 0, 3, 0, 0, 0, 1, 5);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;