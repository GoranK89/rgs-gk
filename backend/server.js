const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const { createSession, getSession, updateSession } = require("./sessions");
const SlotEngine = require("./gameEngine");
const classicFruitsConfig = require("./games/classicFruits");

// Middleware
app.use(cors()); // Allows Vite to connect
app.use(express.json()); // Allows server to read JSON sent in body

const engines = {
  classicFruits: new SlotEngine(classicFruitsConfig),
};

app.post("/api/session", (req, res) => {
  const { playerId, operatorId, balance, currency } = req.body;
  if (!playerId || !operatorId || balance == null)
    return res.status(400).json({ error: "Missing required fields" });

  const token = createSession({ playerId, operatorId, balance, currency });
  res.json({ token });
});

app.post("/api/spin", (req, res) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  const session = token ? getSession(token) : null;
  if (!session)
    return res.status(401).json({ error: "Invalid or expired session" });

  const { betAmount, gameId } = req.body;
  if (!betAmount || betAmount <= 0)
    return res.status(400).json({ error: "Invalid bet amount" });
  if (betAmount > session.balance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  const engine = engines[gameId];
  if (!engine)
    return res.status(400).json({ error: `Unknown game: ${gameId}` });

  session.balance -= betAmount;
  const result = engine.spin(betAmount);
  session.balance += result.totalPayout;

  res.json({ ...result, balance: session.balance });
});

app.listen(port, () => {
  console.log(`RGS is listening on port ${port}`);
});
