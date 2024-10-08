const API_BASE_URL = "/api";

const getAllArenas = async () => {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
        throw new Error("Failed to fetch Arenas");
    }
    return response.json();
};

const getArenaById = async (arenaId) => {
    const response = await fetch(`${API_BASE_URL}/${arenaId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch Arenas");
    }
    return response.json();
};

const ArenasAPI = {
    getAllArenas,
    getArenaById,
};

export default ArenasAPI;
