const ReelStrip = ({ symbols, emojiMap, spinning, stopDelay = 0 }) => {
  return (
    <div className="reel">
      <div
        className={spinning ? "reel-inner spinning" : "reel-inner"}
        style={
          spinning
            ? {
                animationDelay: `0ms`,
                animationDuration: `${400 + stopDelay * 0.3}ms`,
              }
            : {}
        }
      >
        {symbols.map((sym, i) => (
          <div key={i} className="symbol">
            {emojiMap[sym] ?? sym}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelStrip;
