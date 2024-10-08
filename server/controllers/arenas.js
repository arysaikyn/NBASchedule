import pool from "../config/database.js";

const getArenas = async (req, res) => {
    try {
        const requestArenasQuery = `
            SELECT *
            FROM arenas
        `
        const result = await pool.query(requestArenasQuery);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getArenaById = async (req, res) => {
    try {
        const requestArenaByIdQuery = `
            SELECT *
            FROM arenas
            WHERE id=$1
        `
        const arenaId = req.params.arenaId;
        const result = await pool.query(requestArenaByIdQuery, [arenaId]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getGames = async (req, res) => {
    try {
        const requestGamesQuery = `
            SELECT *
            FROM arenas_games
        `
        const result = await pool.query(requestGamesQuery);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getGamesByArena = async (req, res) => {
    try {
        const requestGamesByArenaQuery = `
            SELECT *
            FROM arenas_games
            WHERE arena_id=$1
        `
        const arenaId = req.params.arenaId;
        const results = await pool.query(requestGamesByArenaQuery, [arenaId]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export { getArenas, getArenaById, getGames, getGamesByArena };