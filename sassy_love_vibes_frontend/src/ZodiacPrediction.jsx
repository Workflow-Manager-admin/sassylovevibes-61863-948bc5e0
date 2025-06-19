import React, { useState } from "react";
import "./ZodiacPrediction.css";

// PUBLIC_INTERFACE
/**
 * ZodiacPrediction component for the SassyLoveVibes app.
 * Displays a pastel, whimsical section with a zodiac dropdown,
 * a glowing animated heart, and love horoscope text.
 * There are also animated pastel stars & twinkles in the background.
 */
const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const loveHoroscopes = {
  Aries: "Bold moves pay off: DM your crush or own your love vibe. 💥",
  Taurus: "Stability rocks, but let a little romance shake you up today! 🌷",
  Gemini: "Double the charm, double the fun—flirt with words AND memes! 😘",
  Cancer: "Heart on sleeve? Perfect. Someone special wants to see it! 🦀💖",
  Leo: "You’re the main character—expect dramatic love energy! 🌟",
  Virgo: "Sassy advice: Let your wild side out, just for one flirtatious night. ✨",
  Libra: "Look extra cute, romantic plot twist is coming your way! 🌈",
  Scorpio: "Magnetic energy level UP. Secret admirer? Maybe... 😏",
  Sagittarius: "Adventure zone! Crush on someone unexpected, go for it! 🏹",
  Capricorn: "Break the rules and send that risky text—you know you want to! 🧡",
  Aquarius: "Weird is wonderful—let your unique love style shine. ✨👽",
  Pisces: "Daydreams today = tomorrow’s date. Manifest your romance. 🐠💞",
};

function AnimatedStars() {
  // Render 20 random-positioned stars & twinkles, pastel yellow & purple
  const numStars = 20;
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    const top = Math.random() * 98;
    const left = Math.random() * 90 + 2;
    const size = 7 + Math.random() * 8;
    const delay = Math.random() * 2.5;
    const pastel = Math.random() > 0.5;
    // SVG sparkling star or twinkle
    stars.push(
      <svg
        key={i}
        className={`zodiac-star${pastel ? " pastel-yellow" : " pastel-purple"}`}
        style={{
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`
        }}
        viewBox="0 0 16 16"
        fill="none"
      >
        <g>
          <path
            d="M8 1l1.4 4.2L14 6l-3.3 3.3L11 15l-3-2.2L5 15l0.8-5.7L2 6l4.6-0.8L8 1z"
            fill={pastel ? "#FFFDC2" : "#e8cbff"}
            stroke={pastel ? "#f7de7d" : "#b49dea"}
            strokeWidth={pastel ? "0.7" : "0.8"}
          />
        </g>
      </svg>
    );
  }
  return <div className="zodiac-stars-bg">{stars}</div>;
}

export default function ZodiacPrediction() {
  const [selected, setSelected] = useState("");
  return (
    <div className="zodiac-prediction-container">
      <AnimatedStars />
      <h2 className="zodiac-title">✨ Find Your <span style={{color:'#f7de7d'}}>Zodiac Love Vibe</span> ✨</h2>
      <label htmlFor="zodiac-dropdown" className="zodiac-label">
        Choose your sign:
      </label>
      <select
        id="zodiac-dropdown"
        className="zodiac-dropdown"
        value={selected}
        onChange={e => setSelected(e.target.value)}
        aria-label="Select zodiac sign"
      >
        <option value="">-- Select --</option>
        {zodiacSigns.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <div className="heart-horoscope-glow">
        <svg
          width="140"
          height="120"
          viewBox="0 0 140 120"
          className="heart-svg-bg"
        >
          <defs>
            <radialGradient id="zodiacGradient" cx="50%" cy="65%" r="67%">
              <stop offset="0%" stopColor="#fffbd7" stopOpacity="1"/>
              <stop offset="62%" stopColor="#ffe3fc" stopOpacity="0.84"/>
              <stop offset="98%" stopColor="#eed1ff" stopOpacity="0.6"/>
            </radialGradient>
            <filter id="glow-heart" x="-40%" y="-35%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="15" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="
              M70 112
              Q30 82, 16 59
              Q1 34, 30 20
              Q60 7, 70 34
              Q80 7, 110 20
              Q139 34, 124 59
              Q110 82, 70 112
            "
            fill="url(#zodiacGradient)"
            stroke="#c89fff"
            strokeWidth="2"
            filter="url(#glow-heart)"
          />
        </svg>
        <div className="horoscope-text">
          {selected ?
            <span>{loveHoroscopes[selected]}</span>
            :
            <span className="horoscope-placeholder">Your cosmic love message will appear here!</span>
          }
        </div>
      </div>
    </div>
  );
}
