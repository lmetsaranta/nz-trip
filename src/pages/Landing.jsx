import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Stagger content appearance
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsAnimating(true);
    // Navigate after flight animation completes
    setTimeout(() => {
      navigate("/map");
    }, 4500);
  };

  return (
    <div className="landing">
      {/* Animated background gradient */}
      <div className="landing__gradient" />

      {/* World map background - dotted style inspired by Adobe Stock vectors */}
      <div className="landing__map-bg">
        <svg viewBox="0 0 1000 500" className="landing__world-map" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Dot pattern for continents */}
            <pattern id="dot-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.15)" />
            </pattern>
            {/* Glow filter for markers */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* World map continents */}
          <g fill="url(#dot-pattern)">
            {/* North America */}
            <path d="M55,55 L70,48 L90,45 L115,42 L140,38 L165,35 L190,38 L210,45 L225,42 L240,38 L252,42 L260,52 L255,65 L245,75 L232,82 L222,92 L218,108 L225,120 L238,128 L252,135 L262,148 L258,162 L248,175 L238,188 L232,202 L238,215 L252,222 L262,232 L258,245 L245,252 L228,248 L212,242 L195,238 L178,242 L162,252 L148,258 L135,255 L122,248 L108,238 L95,232 L82,238 L68,248 L55,255 L45,248 L38,235 L35,218 L32,198 L35,178 L42,158 L48,138 L52,118 L55,98 L55,78 Z" />
            {/* Greenland */}
            <path d="M285,32 L305,25 L328,28 L348,38 L358,55 L355,72 L342,85 L325,88 L308,82 L295,68 L288,52 Z" />
            {/* Central America */}
            <path d="M175,248 L188,252 L198,262 L195,275 L182,285 L168,282 L162,268 L168,255 Z" />
            {/* South America */}
            <path d="M215,285 L235,278 L255,285 L272,298 L282,318 L285,342 L278,368 L268,392 L255,412 L238,428 L222,438 L208,432 L202,415 L208,392 L215,368 L212,342 L205,318 L202,298 Z" />
            {/* Europe */}
            <path d="M425,88 L442,82 L462,78 L482,82 L498,92 L512,88 L525,82 L538,88 L548,102 L545,118 L532,132 L515,142 L498,148 L482,152 L465,148 L448,142 L435,132 L428,118 L425,102 Z" />
            {/* UK & Ireland */}
            <path d="M402,98 L415,92 L428,98 L432,112 L425,125 L412,128 L398,122 L395,108 Z" />
            {/* Scandinavia & Finland */}
            <path d="M465,45 L485,38 L508,35 L528,42 L542,55 L548,72 L542,88 L528,82 L512,75 L498,78 L482,82 L468,75 L458,62 Z" />
            {/* Russia/Northern Asia */}
            <path d="M548,45 L592,38 L642,35 L695,38 L748,45 L798,55 L842,68 L878,82 L895,98 L885,115 L862,125 L832,132 L798,135 L762,132 L725,128 L688,125 L652,128 L618,135 L585,138 L555,132 L538,118 L535,98 L542,78 L548,58 Z" />
            {/* Africa */}
            <path d="M438,168 L458,158 L482,155 L508,162 L532,175 L548,195 L558,222 L562,252 L558,285 L548,318 L532,348 L512,372 L488,388 L462,392 L438,382 L422,362 L412,335 L408,305 L412,275 L418,245 L428,218 L435,192 Z" />
            {/* Middle East */}
            <path d="M548,142 L575,138 L602,145 L622,162 L628,182 L618,198 L598,205 L575,198 L555,185 L548,165 Z" />
            {/* India */}
            <path d="M628,192 L652,185 L678,195 L695,218 L702,248 L692,278 L672,298 L648,305 L625,292 L612,265 L612,235 L618,212 Z" />
            {/* Southeast Asia */}
            <path d="M702,245 L725,235 L752,242 L772,262 L778,285 L768,308 L748,322 L722,318 L702,298 L695,272 Z" />
            {/* China/East Asia */}
            <path d="M695,128 L732,118 L772,125 L808,142 L832,165 L842,192 L835,218 L815,238 L788,248 L758,245 L728,235 L702,218 L685,195 L678,168 L682,145 Z" />
            {/* Japan */}
            <path d="M855,132 L872,125 L888,132 L895,148 L888,168 L872,178 L855,172 L848,155 Z" />
            {/* Philippines & Islands */}
            <path d="M788,268 L805,262 L818,272 L815,288 L802,298 L785,292 Z" />
            {/* Indonesia */}
            <path d="M738,328 L768,318 L802,325 L835,338 L862,355 L875,375 L868,392 L842,398 L808,392 L772,382 L742,368 L728,348 Z" />
            {/* Australia */}
            <path d="M778,378 L815,365 L858,372 L898,388 L928,412 L938,442 L925,468 L895,482 L858,485 L822,478 L788,462 L762,438 L752,408 L758,385 Z" />
            {/* New Zealand */}
            <path d="M932,428 L948,418 L962,428 L968,448 L958,468 L942,475 L928,465 L922,448 Z" />
            {/* Tasmania */}
            <path d="M868,478 L882,472 L892,482 L885,492 L872,492 Z" />
            {/* Papua New Guinea */}
            <path d="M872,348 L892,342 L908,352 L912,368 L902,378 L882,378 L868,365 Z" />
            {/* Madagascar */}
            <path d="M572,358 L585,352 L595,365 L592,385 L578,395 L565,385 L565,368 Z" />
          </g>

          {/* Subtle connection lines */}
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" fill="none">
            <path d="M508,55 Q600,20 750,80 Q870,150 940,440" strokeDasharray="2 6" />
          </g>

          {/* Helsinki/Finland marker */}
          <g filter="url(#glow)">
            <circle cx="508" cy="55" r="8" fill="rgba(16,185,129,0.3)" />
            <circle cx="508" cy="55" r="5" fill="#10B981" className="marker-pulse" />
            <circle cx="508" cy="55" r="2" fill="#fff" />
          </g>

          {/* New Zealand/Auckland marker */}
          <g filter="url(#glow)">
            <circle cx="948" cy="445" r="8" fill="rgba(6,95,70,0.4)" />
            <circle cx="948" cy="445" r="5" fill="#065F46" className="marker-pulse" />
            <circle cx="948" cy="445" r="2" fill="#fff" />
          </g>
        </svg>
      </div>

      {/* Hero content */}
      <main className={`landing__hero ${showContent ? "visible" : ""}`}>
        <div className="landing__badge">27-Day Journey</div>
        <h1 className="landing__title">
          <span className="landing__title-line">New Zealand</span>
          <span className="landing__title-line landing__title-line--accent">Adventure</span>
        </h1>
        <p className="landing__desc">
          An epic road trip through Aotearoa — from glaciers to fiords,
          volcanic peaks to pristine beaches. Follow our journey across
          both islands of this stunning country.
        </p>
        <button
          className="landing__btn"
          onClick={handleStart}
          disabled={isAnimating}
        >
          <span className="landing__btn-text">Start Journey</span>
          <span className="landing__btn-icon">→</span>
        </button>
      </main>

      {/* Flight animation overlay */}
      {isAnimating && (
        <div className="flight-overlay">
          <svg viewBox="0 0 1000 500" className="flight-svg">
            <defs>
              {/* Dot pattern for continents - slightly brighter for overlay */}
              <pattern id="flight-dot-pattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.2)" />
              </pattern>
              {/* Gradient for flight path */}
              <linearGradient id="flight-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>
              {/* Glow filter for markers */}
              <filter id="flight-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* World map continents */}
            <g fill="url(#flight-dot-pattern)">
              {/* North America */}
              <path d="M55,55 L70,48 L90,45 L115,42 L140,38 L165,35 L190,38 L210,45 L225,42 L240,38 L252,42 L260,52 L255,65 L245,75 L232,82 L222,92 L218,108 L225,120 L238,128 L252,135 L262,148 L258,162 L248,175 L238,188 L232,202 L238,215 L252,222 L262,232 L258,245 L245,252 L228,248 L212,242 L195,238 L178,242 L162,252 L148,258 L135,255 L122,248 L108,238 L95,232 L82,238 L68,248 L55,255 L45,248 L38,235 L35,218 L32,198 L35,178 L42,158 L48,138 L52,118 L55,98 L55,78 Z" />
              {/* Greenland */}
              <path d="M285,32 L305,25 L328,28 L348,38 L358,55 L355,72 L342,85 L325,88 L308,82 L295,68 L288,52 Z" />
              {/* Central America */}
              <path d="M175,248 L188,252 L198,262 L195,275 L182,285 L168,282 L162,268 L168,255 Z" />
              {/* South America */}
              <path d="M215,285 L235,278 L255,285 L272,298 L282,318 L285,342 L278,368 L268,392 L255,412 L238,428 L222,438 L208,432 L202,415 L208,392 L215,368 L212,342 L205,318 L202,298 Z" />
              {/* Europe */}
              <path d="M425,88 L442,82 L462,78 L482,82 L498,92 L512,88 L525,82 L538,88 L548,102 L545,118 L532,132 L515,142 L498,148 L482,152 L465,148 L448,142 L435,132 L428,118 L425,102 Z" />
              {/* UK & Ireland */}
              <path d="M402,98 L415,92 L428,98 L432,112 L425,125 L412,128 L398,122 L395,108 Z" />
              {/* Scandinavia & Finland */}
              <path d="M465,45 L485,38 L508,35 L528,42 L542,55 L548,72 L542,88 L528,82 L512,75 L498,78 L482,82 L468,75 L458,62 Z" />
              {/* Russia/Northern Asia */}
              <path d="M548,45 L592,38 L642,35 L695,38 L748,45 L798,55 L842,68 L878,82 L895,98 L885,115 L862,125 L832,132 L798,135 L762,132 L725,128 L688,125 L652,128 L618,135 L585,138 L555,132 L538,118 L535,98 L542,78 L548,58 Z" />
              {/* Africa */}
              <path d="M438,168 L458,158 L482,155 L508,162 L532,175 L548,195 L558,222 L562,252 L558,285 L548,318 L532,348 L512,372 L488,388 L462,392 L438,382 L422,362 L412,335 L408,305 L412,275 L418,245 L428,218 L435,192 Z" />
              {/* Middle East */}
              <path d="M548,142 L575,138 L602,145 L622,162 L628,182 L618,198 L598,205 L575,198 L555,185 L548,165 Z" />
              {/* India */}
              <path d="M628,192 L652,185 L678,195 L695,218 L702,248 L692,278 L672,298 L648,305 L625,292 L612,265 L612,235 L618,212 Z" />
              {/* Southeast Asia */}
              <path d="M702,245 L725,235 L752,242 L772,262 L778,285 L768,308 L748,322 L722,318 L702,298 L695,272 Z" />
              {/* China/East Asia */}
              <path d="M695,128 L732,118 L772,125 L808,142 L832,165 L842,192 L835,218 L815,238 L788,248 L758,245 L728,235 L702,218 L685,195 L678,168 L682,145 Z" />
              {/* Japan */}
              <path d="M855,132 L872,125 L888,132 L895,148 L888,168 L872,178 L855,172 L848,155 Z" />
              {/* Philippines & Islands */}
              <path d="M788,268 L805,262 L818,272 L815,288 L802,298 L785,292 Z" />
              {/* Indonesia */}
              <path d="M738,328 L768,318 L802,325 L835,338 L862,355 L875,375 L868,392 L842,398 L808,392 L772,382 L742,368 L728,348 Z" />
              {/* Australia */}
              <path d="M778,378 L815,365 L858,372 L898,388 L928,412 L938,442 L925,468 L895,482 L858,485 L822,478 L788,462 L762,438 L752,408 L758,385 Z" />
              {/* New Zealand */}
              <path d="M932,428 L948,418 L962,428 L968,448 L958,468 L942,475 L928,465 L922,448 Z" />
              {/* Tasmania */}
              <path d="M868,478 L882,472 L892,482 L885,492 L872,492 Z" />
              {/* Papua New Guinea */}
              <path d="M872,348 L892,342 L908,352 L912,368 L902,378 L882,378 L868,365 Z" />
              {/* Madagascar */}
              <path d="M572,358 L585,352 L595,365 L592,385 L578,395 L565,385 L565,368 Z" />
            </g>

            {/* Helsinki marker with label */}
            <g filter="url(#flight-glow)">
              <text x="508" y="38" fill="rgba(255,255,255,0.9)" fontSize="14" textAnchor="middle" fontWeight="600">Helsinki</text>
              <circle cx="508" cy="55" r="10" fill="rgba(16,185,129,0.4)" />
              <circle cx="508" cy="55" r="6" fill="#10B981" />
              <circle cx="508" cy="55" r="2.5" fill="#fff" />
            </g>

            {/* Auckland marker with label */}
            <g filter="url(#flight-glow)">
              <circle cx="948" cy="445" r="10" fill="rgba(6,95,70,0.5)" />
              <circle cx="948" cy="445" r="6" fill="#065F46" />
              <circle cx="948" cy="445" r="2.5" fill="#fff" />
              <text x="948" y="472" fill="rgba(255,255,255,0.9)" fontSize="14" textAnchor="middle" fontWeight="600">Auckland</text>
            </g>

            {/* Flight path - curved great circle route */}
            <path
              className="flight-path"
              d="M508,55 Q650,20 780,120 Q880,220 948,445"
              fill="none"
              stroke="url(#flight-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Animated plane - elegant flat illustration */}
            <g className="flight-plane">
              {/* Fuselage */}
              <path d="M0,-14 L3,-8 L3,8 L0,14 L-3,8 L-3,-8 Z" fill="#ffffff"/>
              {/* Wings */}
              <path d="M-3,-2 L-16,4 L-16,6 L-3,2 Z" fill="rgba(255,255,255,0.9)"/>
              <path d="M3,-2 L16,4 L16,6 L3,2 Z" fill="rgba(255,255,255,0.9)"/>
              {/* Tail wings */}
              <path d="M-3,6 L-8,9 L-8,11 L-3,9 Z" fill="rgba(255,255,255,0.85)"/>
              <path d="M3,6 L8,9 L8,11 L3,9 Z" fill="rgba(255,255,255,0.85)"/>
              {/* Tail fin */}
              <path d="M0,5 L0,2 L2.5,5 Z" fill="rgba(255,255,255,0.7)"/>
              {/* Cockpit */}
              <ellipse cx="0" cy="-9" rx="1.5" ry="2.5" fill="rgba(56,189,248,0.8)"/>
            </g>
          </svg>

          {/* Flight info */}
          <div className="flight-info">
            <div className="flight-info__route">
              <span className="flight-info__city">Helsinki</span>
              <span className="flight-info__arrow">✈</span>
              <span className="flight-info__city">Auckland</span>
            </div>
            <div className="flight-info__distance">17,000 km</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
