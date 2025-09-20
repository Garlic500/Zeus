import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/search", async (req, res) => {
  const q = req.query.q;
  const type = req.query.type || "repositories";

  if (!q) {
    return res.status(400).json({ error: "Falta parámetro q" });
  }

  try {
    const ghUrl = `https://api.github.com/search/${type}?q=${encodeURIComponent(
      q
    )}&per_page=20`;

    const ghResp = await fetch(ghUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent": "my-node-proxy",
      },
    });

    // si GitHub responde con límites
    if (ghResp.status === 403 || ghResp.status === 429) {
      const retryAfter =
        ghResp.headers.get("Retry-After") ||
        ghResp.headers.get("X-RateLimit-Reset");
      return res
        .status(429)
        .json({ error: "Rate limit alcanzado", retry_after: retryAfter });
    }

    const data = await ghResp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy escuchando en http://localhost:${PORT}`);
});
