const SpinButton = ({ onClick, disabled }) => {
  return (
    <button className="spin-btn" onClick={onClick} disabled={disabled}>
      {disabled ? "Spinning..." : "SPIN"}
    </button>
  );
};

export default SpinButton;
