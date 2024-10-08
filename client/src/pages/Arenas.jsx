import React, { useState, useEffect } from "react";
import ArenasAPI from "../services/ArenasAPI.jsx";
import US from "../assets/US.jpg";
import ArenasGames from "./ArenasGames.jsx";
import { Link } from "react-router-dom";

const arenaCoordinates = {
    Lakers: { X: "20%", Y: "55.11%" },
    Clippers: { X: "12.57%", Y: "65.56%" },
    Warriors: { X: "16.23%", Y: "41.33%" },
    Kings: { X: "19.83%", Y: "41.67%" },
    Suns: { X: "28.89%", Y: "60.78%" },
    Jazz: { X: "31.66%", Y: "44.89%" },
    Nuggets: { X: "38.89%", Y: "45.56%" },
    Thunder: { X: "55.09%", Y: "60.89%" },
    Timberwolves: { X: "58.98%", Y: "27.56%" },
    Spurs: { X: "51.34%", Y: "82.00%" },
    Rockets: { X: "54.36%", Y: "83.56%" },
    Pelicans: { X: "67.00%", Y: "80.11%" },
    Mavericks: { X: "56.55%", Y: "70.33%" },
    Grizzlies: { X: "67.32%", Y: "58.78%" },
    Bucks: { X: "66.06%", Y: "28.44%" },
    Bulls: { X: "68.57%", Y: "38.00%" },
    Pistons: { X: "75.19%", Y: "33.56%" },
    Pacers: { X: "71.17%", Y: "42.67%" },
    Cavaliers: { X: "78.00%", Y: "35.56%" },
    Hawks: { X: "77.47%", Y: "67.78%" },
    Hornets: { X: "81.74%", Y: "60.56%" },
    Heat: { X: "83.94%", Y: "90.00%" },
    Magic: { X: "79.85%", Y: "82.22%" },
    "76ers": { X: "87%", Y: "38.56%" },
    Wizards: { X: "85.77%", Y: "47.56%" },
    Knicks: { X: "88.47%", Y: "34.56%" },
    Nets: { X: "90.64%", Y: "34.56%" },
    Celtics: { X: "92.30%", Y: "27.89%" },
    Raptors: { X: "78.55%", Y: "27.33%" },
    "Trail Blazers": { X: "19.00%", Y: "20.00%" },
};

const Arenas = () => {
    const [arenas, setArenas] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let arenas = await ArenasAPI.getAllArenas();
                setArenas(arenas);
            } catch (error) {
                console.error("Failed to fetch arenas:", error);
            }
        })();
    }, []);

    return (
        <div className="bg-US h-screen w-screen bg-cover bg-center relative bg-no-repeat flex justify-center">
            <h1 className="text-4xl p-8"> NBA Schedule </h1>
            {arenas.map((arena) => {
                const coordinates = arenaCoordinates[arena.team];
                return (
                    <Link
                        to={`/${arena.id}`}
                        key={arena.id}
                        style={{
                            position: "absolute",
                            left: coordinates.X,
                            top: coordinates.Y,
                            transform: "translate(-50%, -50%)",
                        }}
                        className="flex flex-col items-center justify-center text-center text-xs group"
                    >
                        <img
                            src={arena.logoimg}
                            alt={`${arena.arena} logo`}
                            className="size-12"
                        />
                        <div className="hidden group-hover:block">
                            <p className="arena-name">{arena.arena}</p>
                            <p className="arena-team">{arena.team}</p>
                        </div>
                    </Link>
                );
            })}
            <h3 className="absolute bottom-0 right-0 p-4"> Made by Arys Aikyn </h3>
        </div>
    );
};

export default Arenas;
