import express from "express";
import { getArenas, getArenaById, getGames, getGamesByArena } from "../controllers/arenas.js";

const router = express.Router();

// Specify for which endpoint which api to use
router.get("/", getArenas);
router.get("/games", getGames);
router.get("/games/:arenaId", getGamesByArena);
router.get("/:arenaId", getArenaById);



export default router;