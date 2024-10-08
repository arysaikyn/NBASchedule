import React from "react";

const Game = ({
    arena_id,
    awayteamname,
    awayteamtime,
    branchlink,
    day,
    gamecity,
    gamecode,
    gamedateest,
    gamedatetimeest,
    gamedatetimeutc,
    gamedateutc,
    gameid,
    gamelabel,
    gamesequence,
    gamestatus,
    gamestatustext,
    gamesublabel,
    gamesubtype,
    gametime,
    gametimeest,
    gametimeutc,
    hometeamname,
    hometeamtime,
    id,
    ifnecessary,
    monthnum,
    postponedstatus,
    seriesgamenumber,
    seriestext,
    weekname,
    weeknumber,
}) => {
    const formatDateTime = (datetime) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(datetime).toLocaleDateString(undefined, options);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-lg bg-gray-100 text-gray-800">
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                    <div className="text-blue-600 font-bold">
                        {hometeamname}
                    </div>
                    <div className="text-gray-600">VS</div>
                    <div className="text-blue-600 font-bold">
                        {awayteamname}
                    </div>
                </div>
                <div className="text-gray-600">
                    {formatDateTime(gamedatetimeutc)}
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">Game Status:</span>
                    <span>{gamestatustext}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-bold">City:</span>
                    <span>{gamecity}</span>
                </div>
            </div>
        </div>
    );
};

export default Game;
