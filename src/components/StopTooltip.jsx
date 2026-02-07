import { useTranslation } from "react-i18next";
import "../styles/tooltip.css";

function StopTooltip({ stop, position, theme }) {
  const { t } = useTranslation();

  if (!stop || !position) return null;

  // Get translated description
  const description = t(`${stop.id}`, { ns: "stops", defaultValue: stop.description });

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
        {description && (
          <p className="stop-tooltip__description">{description}</p>
        )}
      </div>
      <div className="stop-tooltip__arrow" />
    </div>
  );
}

export default StopTooltip;
