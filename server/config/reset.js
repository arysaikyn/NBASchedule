import pool from "./database.js";
import "./dotenv.js";

const createTableQuery = `
    DROP TABLE IF EXISTS arenas CASCADE;
    DROP TABLE IF EXISTS arenas_games CASCADE;

    CREATE TABLE IF NOT EXISTS arenas (
        id SERIAL PRIMARY KEY,
        arena VARCHAR(50) NOT NULL,
        logoImg VARCHAR(200) NOT NULL,
        team VARCHAR(50) NOT NULL,
        UNIQUE (arena, team)
    );

    CREATE TABLE IF NOT EXISTS arenas_games (
        id SERIAL PRIMARY KEY,
        arena_id INTEGER NOT NULL,
        homeTeamName VARCHAR(50) NOT NULL,
        awayTeamName VARCHAR(50) NOT NULL,
        gameCity VARCHAR(50) NOT NULL,
        gameTime TIMESTAMPTZ NOT NULL,
        gameId VARCHAR(20) NOT NULL,
        gameCode VARCHAR(20) NOT NULL,
        gameStatus INTEGER NOT NULL,
        gameStatusText VARCHAR(20) NOT NULL,
        gameSequence INTEGER NOT NULL,
        gameDateEst TIMESTAMPTZ NOT NULL,
        gameTimeEst TIMESTAMPTZ NOT NULL,
        gameDateTimeEst TIMESTAMPTZ NOT NULL,
        gameDateUTC TIMESTAMPTZ NOT NULL,
        gameTimeUTC TIMESTAMPTZ NOT NULL,
        gameDateTimeUTC TIMESTAMPTZ NOT NULL,
        awayTeamTime TIMESTAMPTZ NOT NULL,
        homeTeamTime TIMESTAMPTZ NOT NULL,
        day VARCHAR(20) NOT NULL,
        monthNum INTEGER NOT NULL,
        weekNumber INTEGER NOT NULL,
        weekName VARCHAR(20),
        ifNecessary BOOLEAN NOT NULL,
        seriesGameNumber VARCHAR(20),
        gameLabel VARCHAR(20) NOT NULL,
        gameSubLabel VARCHAR(20),
        seriesText VARCHAR(50),
        postponedStatus VARCHAR(1) NOT NULL,
        branchLink VARCHAR(200),
        gameSubtype VARCHAR(20),
        FOREIGN KEY (arena_id) REFERENCES arenas(id)
    );
`;

const insertArenaQuery = `
    INSERT INTO arenas (arena, logoImg, team) VALUES ($1, $2, $3)
    ON CONFLICT (arena, team) DO NOTHING RETURNING id;
`;

const selectArenaIdQuery = `
    SELECT id FROM arenas WHERE team = $1;
`;

const insertArenaGamesQuery = `
    INSERT INTO arenas_games (
        arena_id, homeTeamName, awayTeamName, gameCity, gameTime, gameId, gameCode, gameStatus, gameStatusText, gameSequence, gameDateEst, gameTimeEst, gameDateTimeEst, gameDateUTC, gameTimeUTC, gameDateTimeUTC, awayTeamTime, homeTeamTime, day, monthNum, weekNumber, weekName, ifNecessary, seriesGameNumber, gameLabel, gameSubLabel, seriesText, postponedStatus, branchLink, gameSubtype
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
    );
`;

const seedArenasTable = async () => {
    try {
        await pool.query(createTableQuery);
        console.log('✅ Tables created successfully');

        const [gameResponse, logoResponse] = await Promise.all([
            fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json"),
            fetch("http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams")
        ]);

        const gameData = (await gameResponse.json()).leagueSchedule.gameDates.flatMap(date => date.games);
        const logoData = (await logoResponse.json()).sports[0].leagues[0].teams;

        const teamLogos = logoData.reduce((acc, team) => {
            acc[team.team.name] = team.team.logos[0].href;
            return acc;
        }, {});

        let gamesInserted = 0;
        const maxGamesInserted = 500;
        let gamesToInsert = [];


        for (const game of gameData) {
            if (gamesInserted == maxGamesInserted){
                break;
            }

            const homeTeam = game.homeTeam.teamName;
            const awayTeam = game.awayTeam.teamName;

            if (!game.arenaState || !game.arenaName || game.seriesText.includes("Neutral") || game.gameStatusText === "Final") {
                continue;
            }

            const exceptions = {
                "Timberwolves": "Minneapolis",
                "Warriors": "San Francisco",
                "Pacers": "Indianapolis",
                "Jazz": "Salt Lake City"
            };

            const homeTeamCity = game.homeTeam.teamCity;
            const arenaCity = game.arenaCity;

            if (arenaCity !== homeTeamCity && (!exceptions[homeTeam] || exceptions[homeTeam] !== arenaCity)) {
                continue;
            }

            // Insert home team arena
            let homeTeamRes = await pool.query(insertArenaQuery, [game.arenaName, teamLogos[homeTeam], homeTeam]);
            if (homeTeamRes.rows.length === 0) {
                homeTeamRes = await pool.query(selectArenaIdQuery, [homeTeam]);
            }
            const homeTeamId = homeTeamRes.rows[0].id;

            gamesInserted++;
            process.stdout.write(`Inserted game ${gamesInserted}\r`);

            // Insert arena game
            await pool.query(insertArenaGamesQuery, [
                homeTeamId,
                homeTeam,
                awayTeam,
                game.arenaCity,
                game.gameDateTimeUTC,
                game.gameId,
                game.gameCode,
                game.gameStatus,
                game.gameStatusText,
                game.gameSequence,
                game.gameDateEst,
                game.gameTimeEst,
                game.gameDateTimeEst,
                game.gameDateUTC,
                game.gameTimeUTC,
                game.gameDateTimeUTC,
                game.awayTeamTime,
                game.homeTeamTime,
                game.day,
                game.monthNum,
                game.weekNumber,
                game.weekName,
                game.ifNecessary,
                game.seriesGameNumber,
                game.gameLabel,
                game.gameSubLabel,
                game.seriesText,
                game.postponedStatus,
                game.branchLink,
                game.gameSubtype
            ]);
        }

        console.log(`✅ Data inserted successfully, Games Count: ${maxGamesInserted}`);
    } catch (error) {
        console.error('Error seeding tables:', error);
    }
};

seedArenasTable();