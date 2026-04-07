import ReelStrip from "./ReelStrip";

const SYMBOL_EMOJI = {
  seven: "7️⃣",
  bar: "🍫",
  bell: "🔔",
  watermelon: "🍉",
  grape: "🍇",
  orange: "🍊",
  lemon: "🍋",
  cherry: "🍒",
};

const SlotMachine = ({ reelGrid, wins, spinning }) => {
  const displayGrid = reelGrid ?? [
    ["?", "?", "?"],
    ["?", "?", "?"],
    ["?", "?", "?"],
  ];

  return (
    <div className="slot-machine">
      {displayGrid.map((reelSymbols, i) => (
        <ReelStrip
          key={i}
          symbols={reelSymbols}
          emojiMap={SYMBOL_EMOJI}
          spinning={spinning}
          stopDelay={i * 300} // reel 0 stops first, then 1, then 2
        />
      ))}
      {wins?.length > 0 && (
        <div className="win-message">
          Win! +{wins.reduce((s, w) => s + w.payout, 0).toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default SlotMachine;
