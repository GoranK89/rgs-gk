module.exports = {
  id: "classicFruits",
  name: "Classic Fruits",
  reels: 3,
  rows: 3,
  // Each payline is [rowForReel0, rowForReel1, rowForReel2]
  paylines: [
    [0, 0, 0], // top row
    [1, 1, 1], // middle row
    [2, 2, 2], // bottom row
  ],
  symbols: [
    { id: "seven", weight: 2, payouts: { 3: 50 } },
    { id: "bar", weight: 5, payouts: { 3: 20 } },
    { id: "bell", weight: 8, payouts: { 3: 10 } },
    { id: "watermelon", weight: 12, payouts: { 3: 5 } },
    { id: "grape", weight: 15, payouts: { 3: 4 } },
    { id: "orange", weight: 20, payouts: { 2: 0.5, 3: 3 } },
    { id: "lemon", weight: 20, payouts: { 2: 0.5, 3: 2 } },
    { id: "cherry", weight: 30, payouts: { 2: 1, 3: 2 } },
  ],
};
