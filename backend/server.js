const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
    host: process.env.DB_HOST || "database",
    port: 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "myapp"
});

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW() AS current_time");

        res.json({
            status: "success",
            message: "Backend is connected to PostgreSQL",
            database_time: result.rows[0].current_time
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Database connection failed",
            error: error.message
        });
    }
});

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from the Docker backend!"
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Backend running on port ${port}`);
});