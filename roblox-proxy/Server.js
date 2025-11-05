// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Ruta para obtener info pública de un usuario por ID
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const rbx = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    if (!rbx.ok) throw new Error("Roblox API error");
    const data = await rbx.json();
    res.json({
      id: data.id,
      name: data.name,
      displayName: data.displayName,
      description: data.description,
      created: data.created
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (Opcional) Endpoint para obtener avatar thumbnail
app.get("/avatar/:id", async (req, res) => {
  const id = req.params.id;
  const thumb = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=100x100&format=Png`);
  const data = await thumb.json();
  res.json(data);
});

app.listen(PORT, () => console.log(`✅ Proxy running on port ${PORT}`));