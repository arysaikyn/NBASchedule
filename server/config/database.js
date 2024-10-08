import pg from "pg"

const config = {
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.port,
    database: process.env.database
}

const pool = new pg.Pool(config)

export default pool;