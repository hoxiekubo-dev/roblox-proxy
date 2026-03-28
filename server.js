import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Working Roblox Proxy");
});

app.get("/user/:id", async (req, res) => {
    const UserId = parseInt(req.params.id);

    try {
        const General = await fetch(`https://users.roblox.com/v1/users/${UserId}`);
        if (!General.ok) {
            return res.status(General.status).json({ error: "Roblox API Error" });
        }
        const Data1 = await General.json();

        const RobloxBadges = await fetch(`https://accountinformation.roblox.com/v1/users/${UserId}/roblox-badges`);
        const hasAdminBadge = false;
        if (!RobloxBadges.ok) {
            return res.status(General.status).json({ error: "Roblox API Error" });
        } else {
            hasAdminBadge = RobloxBadges.json().some(badge => badge.id === 1);
        }

        const result = {
            isBanned: Data1.isBanned,
            created: Data1.created,
            isAdmin: hasAdminBadge
        };

        res.json(result);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});
