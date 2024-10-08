const fetchTeamArenas = async () => {
    try {
        const logoResponse = await fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json");
        const logoData = (await logoResponse.json()).leagueSchedule.gameDates;

        console.log(logoData);

        const teamArenas = logoData.reduce((acc, date) => {
            date.games.forEach(game => {
                const teamId = game.homeTeam.teamId;
                const arena = game.arenaName;
                acc[teamId] = arena;
            });
            return acc;
        }, {});

        return teamArenas;
    } catch (error) {
        console.error("Error fetching team arenas:", error);
        return {};
    }
};

fetchTeamArenas().then(teamArenas => console.log(teamArenas));
