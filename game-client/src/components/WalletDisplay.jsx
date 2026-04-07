const WalletDisplay = ({ balance }) => {
  return (
    <div className="wallet">
      Balance: {balance != null ? `€${balance.toFixed(2)}` : "—"}
    </div>
  );
};

export default WalletDisplay;
