import React from "react";
import { useRoutes } from "react-router-dom";
import Arenas from "./pages/Arenas.jsx";
import ArenasGames from "./pages/ArenasGames.jsx";

const App = () => {
    let element = useRoutes([
        {
            path: "/",
            element: <Arenas />,
        },
        {
            path: "/:arenaId",
            element: <ArenasGames />,
        },
    ]);

    return (
        <>
          {element}
        </>
    );
};

export default App;