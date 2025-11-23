import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

// URL base de la API oficial de Roblox
const ROBLOX_USER_API = "https://users.roblox.com/v1";

app.get("/", (req, res) => {
    res.send("Roblox Proxy is running");
});

// Obtener TODA la información de /v1/users/{userId}
app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const response = await fetch(`${ROBLOX_USER_API}/users/${userId}`);

        if (!response.ok) {
            return res.status(response.status).json({ 
                error: "Error getting user data" 
            });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// Obtener avatar (opcional)
app.get("/avatar/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const response = await fetch(
            `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=false`
        );

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// Render usará este puerto automáticamente
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});
