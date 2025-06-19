import React, { useRef, useState } from "react";
import "./SpinTheHeart.css";

// Flirty/romantic spin outcomes:
const OUTCOMES = [
  { label: "Secret Admirer", icon: "💌" },
  { label: "Go Text Them!", icon: "📱" },
  { label: "It’s Fate!", icon: "💫" },
  { label: "Flirt Alert!", icon: "😏" },
  { label: "Make a Move!", icon: "🌈" },
  { label: "Cuddle Mood", icon: "🧸" },
  { label: "Sweetheart Moment", icon: "🍭" },
  { label: "Love Emoji Drop", icon: "😍" }
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// A pastel star SVG for effects
function PastelStar({ style, className }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 16 16"
      fill="none"
      style={style}
      className={className}
    >
      <g>
        <path
          d="M8 1l1.4 4.2L14 6l-3.3 3.3L11 15l-3-2.2L5 15l0.8-5.7L2 6l4.6-0.8L8 1z"
          fill="#FFD7FF"
          stroke="#DFB2EE"
          strokeWidth="0.72"
        />
      </g>
    </svg>
  );
}

// PUBLIC_INTERFACE
/**
 * SpinTheHeart: A dreamy, pastel, flirty heart spin mini-game component.
 */
function SpinTheHeart() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [resultIdx, setResultIdx] = useState(null);
  const [glowShow, setGlowShow] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const wheelRef = useRef(null);

  const outcomeCount = OUTCOMES.length;

  // Handle spin
  function handleSpinClick() {
    if (isSpinning) return;
    setGlowShow(false);
    const target = getRandomInt(OUTCOMES.length);
    setResultIdx(null);
    setIsSpinning(true);

    // Calculate spin: at least 4 full rotations + land on the target segment
    const segment = 360 / outcomeCount;
    const extraRot = 4 * 360; // 4 full spins for effect
    const angle = extraRot + (outcomeCount - target) * segment + (segment/2);
    setSpinAngle(prev => prev + angle);

    // Reveal after 2s for fancy effect
    setTimeout(() => {
      setResultIdx(target);
      setGlowShow(true);
      setIsSpinning(false);
    }, 2050);
  }

  // Custom heart-shaped spinning wheel SVG
  function renderWheel() {
    const radius = 80, cx = 100, cy = 90;
    // For each segment, compute heart arc slice and label position
    return (
      <svg
        width="200"
        height="180"
        style={{ display: "block" }}
        viewBox="0 0 200 180"
      >
        {/* Main big heart shape for background */}
        <defs>
          <radialGradient id="spinGradient" cx="50%" cy="60%" r="72%">
            <stop offset="0%" stopColor="#fff6fc" />
            <stop offset="80%" stopColor="#ffe4e1" />
            <stop offset="100%" stopColor="#f6deff" />
          </radialGradient>
          <filter id="heart-glow" x="-40%" y="-40%" width="180%" height="190%">
            <feGaussianBlur stdDeviation="6.5" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path
          d="
            M100,164
            Q33,115 25,68
            Q16,19 65,24
            Q89,27 100,54
            Q111,27 135,24
            Q184,19 175,68
            Q167,115 100,164
          "
          fill="url(#spinGradient)"
          filter="url(#heart-glow)"
          stroke="#E2B0F7"
          strokeWidth="2.3"
        />
        {/* Wedges: Draw segments */}
        {OUTCOMES.map((o, idx) => {
          const angle0 = ((idx) / outcomeCount) * 2 * Math.PI - Math.PI / 2;
          const angle1 = ((idx + 1) / outcomeCount) * 2 * Math.PI - Math.PI / 2;
          const x0 = cx + radius * Math.cos(angle0) * 0.93;
          const y0 = cy + radius * Math.sin(angle0) * 0.90;
          const x1 = cx + radius * Math.cos(angle1) * 0.93;
          const y1 = cy + radius * Math.sin(angle1) * 0.90;
          return (
            <path
              key={idx}
              d={`M${cx},${cy} L${x0},${y0} A${radius * 0.93},${radius * 0.90} 0 0,1 ${x1},${y1}Z`}
              fill={idx % 2 === 0 ? "#ffe7fa" : "#ffe4e187"}
              opacity="0.95"
            />
          );
        })}
        {/* Dots and labels on top */}
        {OUTCOMES.map((o, idx) => {
          const angleMid = ((idx + 0.5) / outcomeCount) * 2 * Math.PI - Math.PI / 2;
          const lx = cx + (radius - 24) * Math.cos(angleMid) * 0.83;
          const ly = cy + (radius - 24) * Math.sin(angleMid) * 0.89;
          return (
            <g key={o.label}>
              <circle
                cx={cx + (radius-7) * Math.cos(angleMid) * 0.94}
                cy={cy + (radius-7) * Math.sin(angleMid) * 0.91}
                r="11"
                fill="#fff9"
                stroke="#ffe3fc"
                strokeWidth="1.2"
                filter="url(#heart-glow)"
              />
              <text
                x={lx}
                y={ly + 7}
                textAnchor="middle"
                fontSize="1.09em"
                fontFamily="'Pacifico','Comic Sans',cursive,sans-serif"
                fill="#be44c7"
                style={{
                  filter: "drop-shadow(0 0 8px #ffd1dcaa)"
                }}
              >
                {o.icon}
              </text>
              <text
                x={lx}
                y={ly + 28}
                textAnchor="middle"
                fontSize="0.85em"
                fontFamily="Montserrat, Arial, sans-serif"
                fill="#b04eca"
                style={{
                  fontWeight: 500,
                  textShadow: "0 2.5px 10px #ffc3e888"
                }}
              >
                {o.label}
              </text>
            </g>
          );
        })}
        {/* Center spinning heart */}
        <g>
          <ellipse
            cx={cx}
            cy={cy+6}
            rx={28}
            ry={25}
            fill="#ffedfa"
            stroke="#ffcbe4"
            strokeWidth="2"
            filter="url(#heart-glow)"
          />
          <text
            x={cx}
            y={cy+17}
            textAnchor="middle"
            fontFamily="'Pacifico', cursive"
            fontSize="1.35em"
            fill="#e75480"
            filter="url(#heart-glow)"
          >💖</text>
        </g>
      </svg>
    );
  }

  // Spinning wrapper — rotate as per spinAngle
  return (
    <div className="spin-heart-container">
      <div className="spin-title">💘 Spin the Heart</div>
      <div className="spin-heart-wheel-wrap">
        <div
          className={"spinning-heart-wheel " + (isSpinning ? "spinning" : "")}
          ref={wheelRef}
          style={{
            transform: `rotate(${spinAngle}deg)`,
            transition: isSpinning
              ? "transform 2s cubic-bezier(.32,1.7,.53,0.98)"
              : "transform 0.26s cubic-bezier(.74,1.13,.62,1.12)"
          }}
        >
          {renderWheel()}
        </div>
        <span className="wheel-pointer">
          <svg width="28" height="34">
            <polygon
              points="14,3 26,28 2,28"
              fill="#ffdaee"
              stroke="#e75480"
              strokeWidth="1.3"
              filter="drop-shadow(0 1px 9px #ffd1dc99)"
            />
          </svg>
        </span>
        {/* Animating pastel hearts/stars for dreamy effect */}
        <div className="wheel-animated-hearts">
          {[...Array(7)].map((_, i) =>
            <span
              className={"floating-pastel-heart"}
              key={i}
              style={{
                left: `${12 + i * 12}%`,
                animationDelay: `${(i * 0.23 + 0.5 * (i%2))}s`
              }}
              role="img"
              aria-label="decorative heart"
            >💖</span>
          )}
        </div>
        <div className="wheel-animated-stars">
          {[...Array(5)].map((_, i) =>
            <PastelStar
              key={i}
              style={{
                left: `${18 + i * 17}%`,
                top: `${4 + i * 12}px`,
                animationDelay: `${0.12 + i * 0.25}s`
              }}
              className="pastel-star-spin"
            />
          )}
        </div>
      </div>
      <button
        className={
          "btn btn-large pastel spin-now-btn" +
          (isSpinning ? " btn-disabled" : "")
        }
        onClick={handleSpinClick}
        disabled={isSpinning}
        aria-label="Spin the heart"
      >
        <span className="spin-stars">💫</span>
        Spin Now
      </button>
      {/* Result: appears in glowing pastel box after spin */}
      {resultIdx !== null && (
        <div
          className={
            "spin-heart-result-box animated-fadein " +
            (glowShow ? "glow" : "")
          }
        >
          <span className="spin-result-icon" role="img" aria-label="result">
            {OUTCOMES[resultIdx].icon}
          </span>
          <span className="spin-result-label">{OUTCOMES[resultIdx].label}</span>
        </div>
      )}
    </div>
  );
}

export default SpinTheHeart;
