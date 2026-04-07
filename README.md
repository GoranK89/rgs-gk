# RGS-GK — Remote Gaming Server Demo

A minimal iGaming stack that models casino gaming platforms.

```
Operator Demo  →  Game Client (React)  →  Backend RGS (Express)
```

The only game currently implemented is **Classic Fruits** — a 3-reel, 3-row slot with weighted symbol payouts.

---

## Architecture

| Tier          | Folder           | Technology          | Port   |
| ------------- | ---------------- | ------------------- | ------ |
| Backend (RGS) | `backend/`       | Node.js + Express 5 | `3000` |
| Game Client   | `game-client/`   | React 19 + Vite     | `5173` |
| Operator Demo | `operator-demo/` | Static HTML         | —      |

- **Backend** handles session creation, bet validation, spin logic, and payout calculation. Sessions are stored in memory (lost on server restart).
- **Game Client** is a React app that runs inside an `<iframe>`. It receives a session token from the URL query string and calls the backend on each spin.
- **Operator Demo** is a standalone HTML file that simulates a casino lobby — it creates a session and launches the game client in a modal iframe.

---

## Prerequisites

- **Node.js 20 LTS** or later ([nodejs.org](https://nodejs.org))
- **npm** (bundled with Node.js)

---

## Running Locally

You need **three things** running at the same time: the backend, the game client dev server, and a browser tab with the operator demo.

### 1. Start the backend

```bash
cd backend
npm install
npm start
```

The RGS API will be available at `http://localhost:3000`.

### 2. Start the game client

Open a new terminal:

```bash
cd game-client
npm install
npm run dev
```

The React app will be served at `http://localhost:5173`.

### 3. Open the operator demo

Open `operator-demo/index.html` directly in your browser (no server needed — just double-click it or use `File > Open` in the browser).

Click the **Classic Fruits** tile to launch the game inside a modal. The demo page will:

1. Create a player session against the backend
2. Load the game client in an iframe with the session token
