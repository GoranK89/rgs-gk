class SlotEngine {
  constructor(gameConfig) {
    this.config = gameConfig;
  }

  spin(betAmount) {
    const reelGrid = this.#spinReels();
    const wins = this.#evaluateWins(reelGrid, betAmount);
    const totalPayout = wins.reduce((sum, w) => sum + w.payout, 0);
    return { reelGrid, wins, totalPayout };
  }

  #spinReels() {
    const { reels, rows, symbols } = this.config;
    const grid = [];
    for (let reel = 0; reel < reels; reel++) {
      const reel = [];
      for (let row = 0; row < rows; row++) {
        reel.push(this.#weightedRandom(symbols));
      }
      grid.push(reel);
    }
    return grid; // grid[reel][row] = symbolId
  }

  #weightedRandom(symbols) {
    const totalWeight = symbols.reduce((sum, s) => sum + s.weight, 0);
    let rand = Math.random() * totalWeight;
    for (const symbol of symbols) {
      rand -= symbol.weight;
      if (rand <= 0) return symbol.id;
    }
    return symbols[symbols.length - 1].id;
  }

  #evaluateWins(reelGrid, betAmount) {
    const { paylines, symbols } = this.config;
    const wins = [];

    for (let i = 0; i < paylines.length; i++) {
      const line = paylines[i].map((row, reel) => reelGrid[reel][row]);

      // Count consecutive matching symbols from left
      const firstSymbol = line[0];
      let count = 1;
      for (let j = 1; j < line.length; j++) {
        if (line[j] === firstSymbol) count++;
        else break;
      }

      const symbolDef = symbols.find((s) => s.id === firstSymbol);
      if (symbolDef?.payouts?.[count]) {
        wins.push({
          paylineIndex: i,
          symbol: firstSymbol,
          count,
          payout: symbolDef.payouts[count] * betAmount,
        });
      }
    }

    return wins;
  }
}

module.exports = SlotEngine;
