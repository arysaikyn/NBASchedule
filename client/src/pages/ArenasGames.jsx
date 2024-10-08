import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Game from "../components/Game.jsx";
import GamesAPI from "../services/GamesAPI.jsx";
import ArenasAPI from "../services/ArenasAPI.jsx";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ArenasGames = () => {
    const { arenaId } = useParams();
    const [games, setGames] = useState([]);
    const [arena, setArena] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const games = await GamesAPI.getGamesById(arenaId);
                setGames(games);
                const arena = await ArenasAPI.getArenaById(arenaId);
                setArena(arena);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch games:", error);
                setLoading(false);
            }
        })();
    }, [arenaId]);

    return (
        <div className="absolute w-screen h-screen flex justify-center items-center bg-neutral-600 bg-opacity-30 z-10">
            <div className="w-3/4 h-3/4 bg-white rounded-3xl shadow-lg p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="flex-grow text-center text-2xl font-semibold">
                        {loading ? "Loading" : `Games Upcoming at ${games[0]?.gamecity} ${arena.arena}`}
                    </h1>
                    <Link to="/">
                        <RxCross1
                            className="text-2xl cursor-pointer"
                        />
                    </Link>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="text-lg">Loading...</span>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-4 overflow-y-scroll h-full p-4 custom-scroll">
                        {games.map((game) => (
                            <Game
                                key={game.id}
                                {...game}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArenasGames;
