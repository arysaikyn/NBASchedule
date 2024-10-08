const API_BASE_URL = "/api";

const getAllGames = async () => {
    const response = await fetch(`${API_BASE_URL}/games`);
    if (!response.ok) {
        throw new Error("Failed to fetch All Games");
    }
    return response.json();
};

const getGamesById = async (arenaId) => {
    const response = await fetch(`${API_BASE_URL}/games/${arenaId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch Games by Arena ID");
    }
    return response.json();
};

const GamesAPI = {
    getAllGames,
    getGamesById,
};

export default GamesAPI;
