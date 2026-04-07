const { v4: uuidv4 } = require("uuid");

const SESSION_MS = 4 * 60 * 60 * 1000; // 4 hours
const sessions = new Map();

function createSession({ playerId, operatorId, balance, currency = "EUR" }) {
  const token = uuidv4();
  sessions.set(token, {
    playerId,
    operatorId,
    balance,
    currency,
    createdAt: Date.now(),
  });
  return token;
}

function getSession(token) {
  const session = sessions.get(token);
  if (!session) return null;
  if (Date.now() - session.createdAt > SESSION_MS) {
    sessions.delete(token);
    return null;
  }
  return session;
}

function updateSession(token, updates) {
  const session = sessions.get(token);
  if (!session) return false;
  sessions.set(token, { ...session, ...updates });
  return true;
}

function deleteSession(token) {
  sessions.delete(token);
}

module.exports = { createSession, getSession, updateSession, deleteSession };
