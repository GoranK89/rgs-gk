import { useState } from "react";
import SlotMachine from "./components/SlotMachine";
import SpinButton from "./components/SpinButton";
import WalletDisplay from "./components/WalletDisplay";
import { spin } from "./api/spin";
import "./App.css";

function App() {
  // Read token from URL: /game?token=abc123
  const token = new URLSearchParams(window.location.search).get("token");

  const [balance, setBalance] = useState(null);
  const [reelGrid, setreelGrid] = useState(null);
  const [wins, setWins] = useState(null);
  const [isSpinning, setIsSpinning] = useState(null);
  const [error, setError] = useState(null);

  const GAME_ID = "classicFruits";
  const betAmount = 1.0;

  const handleSpin = async () => {
    setIsSpinning(true);
    setWins([]);
    setError(null);
    try {
      const [result] = await Promise.all([
        spin({ token, betAmount, gameId: GAME_ID }),
        new Promise((resolve) => setTimeout(resolve, 1000)), // min spin time
      ]);
      setreelGrid(result.reelGrid);
      setWins(result.wins);
      setBalance(result.balance);
    } catch (err) {
      setError(err.response?.data?.error ?? "Spin failed");
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="game-container">
      <h1>Classic Fruits</h1>
      <WalletDisplay balance={balance} />
      <SlotMachine reelGrid={reelGrid} wins={wins} spinning={isSpinning} />
      <SpinButton onClick={handleSpin} disabled={isSpinning} />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
