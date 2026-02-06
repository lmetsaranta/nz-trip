import "../styles/tooltip.css";

function StopTooltip({ stop, position, theme }) {
  if (!stop || !position) return null;

  return (
    <div
      className={`stop-tooltip${theme === "dark" ? " stop-tooltip--dark" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="stop-tooltip__content">
        <p className="stop-tooltip__name">{stop.name}</p>
        {stop.description && (
          <p className="stop-tooltip__description">{stop.description}</p>
        )}
      </div>
      <div className="stop-tooltip__arrow" />
    </div>
  );
}

export default StopTooltip;
