import React, { useState, useRef } from "react";
import "./App.css";
import ZodiacPrediction from "./ZodiacPrediction";
import "./SpinTheHeart.css";
import SpinTheHeart from "./SpinTheHeart";

// Sounds as data URIs for portability (short pop and ding)
const popSound =
  "data:audio/wav;base64,UklGRhYAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAD9z+cg/LP/X/7kXgAAA//8ARAAAFgAAgAMAAQABAAsDgQYAAAD+AAD/qgBjAAg=";
const dingSound =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAABCxAAACABAAZGF0YQAAACAgICAgEBAgSean//zGQAAAEAAABRAAAAGv///w==";

// Array of sassy/flirty love verdicts and playful lines
const messages = [
  "You're the sprinkles on my cupcake. 💖",
  "If loving you is a crime, I'm ready for jail. 🚓💕",
  "You + Me = Ultimate Vibe ✨",
  "Are you a magician? Because when I look at you, everyone else disappears. 🪄",
  "Caught feelings? Oops, too late! 🏹",
  "Sassy, classy, and a little bit smart-assy—just like you deserve. 😉",
  "Warning: Serious heart-thief detected! 🚨",
  "You radiate more charm than my phone screen at max brightness. 🔆",
  "Our love story: 10/10, would recommend! 😍",
  "You make my heart do the Renegade. 🎵💃",
  "Cupid called—he wants his arrows back. 🏹",
  "I’d share my fries AND my playlist with you. 🍟🎧",
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

// Animated hearts SVG generator
function HeartsBackground() {
  // Generate 15 floating heart SVGs at random x positions and with infinite animation delays for variety
  const heartCount = 15;
  const hearts = [];
  for (let i = 0; i < heartCount; i++) {
    const size = 24 + Math.random() * 32;
    const left = Math.random() * 100;
    const duration = 7 + Math.random() * 6;
    const delay = Math.random() * 6;
    hearts.push(
      <svg
        key={i}
        className="floating-heart"
        style={{
          left: `${left}%`,
          width: size,
          height: size,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
        viewBox="0 0 48 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 42s-9.6-8.2-15.8-14.2C2.7 24.5.5 20.7 1.1 16.9 2.2 10.2 10.5 6.3 16.3 10.6 19.3 12.7 21 15 24 18.6c3-3.6 4.7-5.9 7.7-8C37.5 6.3 45.8 10.2 46.9 16.9c.6 3.8-1.6 7.6-7.1 11C33.6 33.8 24 42 24 42z"
          fill="#ffb6c1"
          stroke="#e75480"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  return <div className="hearts-bg">{hearts}</div>;
}

// Sparkle SVG for button effect
function Sparkle() {
  return (
    <svg width="24" height="24" fill="none" className="sparkle">
      <g filter="url(#f1)">
        <path
          d="M12 2l2.1 4.9L19 7l-4 3.4L16 15l-4-2.2L8 15l1-4.6L5 7l4.9-.1L12 2z"
          fill="#fff7"
          stroke="#ffe4e1"
          strokeWidth="0.8"
        />
      </g>
      <defs>
        <filter
          id="f1"
          x="0"
          y="0"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2"
            floodColor="#ffff"
            floodOpacity="0.9"
          />
        </filter>
      </defs>
    </svg>
  );
}

/* 
  PUBLIC_INTERFACE
  This App component now supports both the user's name and their crush's name inputs.
  Both fields are playful, stylish, responsive, and appear together in the main form. 
  The generated vibe message can reference both names, if entries provided.
*/
function App() {
  const [name, setName] = useState("");
  const [crush, setCrush] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loveMessage, setLoveMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const audioRef = useRef();

  // Handles "Get My Love Vibe" click: play sound, transition, show personalized result
  const handleClick = () => {
    if (!name.trim()) return;
    playSound(popSound);
    setLoading(true);
    setTimeout(() => {
      let result;
      // Generate a random playful 'match or not' style message referencing both names
      if (name.trim() && crush.trim()) {
        // Array of 'match' and playful/flirty personalized verdicts
        const matchTemplates = [
          `${name.trim()} & ${crush.trim()} sitting in a tree... Definitely got a vibe! 💖`,
          `Alert: Matchmaker just called, ${name.trim()} and ${crush.trim()} are the next IT couple! ✨`,
          `${crush.trim()}, you're on ${name.trim()}'s radar—heartthrob alert! 🚨`,
          `Sparks between ${name.trim()} and ${crush.trim()}? This love-o-meter is sizzling! 🔥`,
          `${name.trim()} just shot a cupid arrow at ${crush.trim()}... Did it hit? Oh yes, total match! 🏹`,
          `The chemistry between ${name.trim()} & ${crush.trim()} is off the charts. It's a match! 😍`,
          `Rumor has it, ${crush.trim()} dreams of ${name.trim()} too. Swipe right on destiny! 💫`,
          `If ${crush.trim()} doesn't see it, they're missing out BIG TIME on ${name.trim()}!`,
          `Plot twist: ${name.trim()} & ${crush.trim()} = hottest couple of the year! 🌟`,
          `Breaking news: ${crush.trim()} can't resist ${name.trim()}'s vibe!`,
          `Love vibes detected! ${name.trim()} <3 ${crush.trim()} – ?? Flirty points: 9.9/10!`,
          `Someone tell ${crush.trim()} they're living in ${name.trim()}'s mind rent-free... 🥰`,
          `If being a match was a game, ${name.trim()} & ${crush.trim()} just won!`,
          `Cupid’s verdict: ${name.trim()} + ${crush.trim()} = a ship worth sailing! 🚢`,
          `Wait... is that butterflies? Looks like ${name.trim()} and ${crush.trim()} are a total MATCH! 🦋`,
          `Dear ${crush.trim()}, ${name.trim()} just matched your vibe—are you ready?`,
        ];
        // Choose a random template
        result = matchTemplates[Math.floor(Math.random() * matchTemplates.length)];
      } else {
        // Fall back to a sassy/flirty message not referencing both names
        result = getRandomMessage();
      }
      setLoveMessage(result);
      setShowResult(true);
      setLoading(false);
      playSound(dingSound);
    }, 800);
  };

  // Play a sound (from data URI)
  function playSound(uri) {
    if (audioRef.current) {
      audioRef.current.src = uri;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  // Reset to try again
  function reset() {
    setShowResult(false);
    setName("");
    setCrush("");
    setLoveMessage("");
    playSound(popSound);
  }

  return (
    <div className="app">
      <HeartsBackground />
      <audio ref={audioRef} style={{ display: "none" }} />
      <nav className="navbar sassy-navbar">
        <div className="container nav-container">
          <div
            className="logo love-chamber-header"
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontWeight: 700,
              fontSize: "2.1rem",
              color: "#ae158d",
              letterSpacing: "3px",
              textShadow: "0 2px 11px #ffe4e166, 0 0 4px #fff6",
            }}
          >
            LOVE CHAMBER
          </div>
        </div>
      </nav>
      <main>
        <div className="app-content-flex container" style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '38px', marginTop: '18px'}}>
          <div style={{flex: 1, minWidth: 0, maxWidth: 510, display: "flex", flexDirection: "column", gap: '24px'}}>
            <div className="center-box">
              <div className="subtitle pastel">
                Sassy. Flirty. Always a vibe. 💅
              </div>
              <h1 className="title main-title">
                Enter the Love Chamber!
              </h1>
              <div className="description">
                Enter your name and (optionally) your crush's name for a sassy love verdict and some Gen-Z-worthy flirtation.
              </div>

              {!showResult ? (
                <form
                  className="love-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                  autoComplete="off"
                  style={{ width: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-end",
                    }}
                  >
                    <div style={{ flex: "1 1 150px", minWidth: "120px" }}>
                      <input
                        className="name-input"
                        placeholder="Your Name"
                        maxLength={14}
                        value={name}
                        autoFocus
                        onChange={e => setName(e.target.value)}
                        disabled={loading}
                        aria-label="Enter your name"
                        required
                      />
                    </div>
                    <div style={{ flex: "1 1 150px", minWidth: "120px" }}>
                      <input
                        className="name-input"
                        placeholder="Crush's Name"
                        maxLength={14}
                        value={crush}
                        onChange={e => setCrush(e.target.value)}
                        disabled={loading}
                        aria-label="Enter your crush's name"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={
                      "btn btn-large get-vibe-btn sparkle-btn" +
                      (loading || !name.trim() ? " btn-disabled" : "")
                    }
                    disabled={loading || !name.trim()}
                    style={{ marginTop: "3px", width: "100%" }}
                  >
                    <Sparkle />
                    {loading ? "Vibing..." : "Get My Love Vibe"}
                  </button>
                </form>
              ) : (
                <div
                  className="love-result animated-fadein"
                  role="status"
                  aria-live="polite"
                  tabIndex={0}
                >
                  <div className="your-name">
                    {name.trim()}
                    {crush.trim() ? (
                      <>
                        {" "}
                        <span style={{ color: "#b83274", fontWeight: 400 }}>
                          &amp; {crush.trim()}
                        </span>,
                      </>
                    ) : (
                      "," // classic, just user!
                    )}
                  </div>
                  <div className="love-message">{loveMessage}</div>
                  <button
                    className="btn btn-large sparkle-btn try-again-btn"
                    onClick={reset}
                    aria-label="Try again"
                  >
                    <Sparkle />
                    Try Again
                  </button>
                </div>
              )}
            </div>
            {/* ZodiacPrediction below the Moodboard/Love Chamber */}
            <ZodiacPrediction />
            <SpinTheHeart />
          </div>
          {/* Right side: empty or reserved for future features, spacing only on desktop */}
          <div style={{ flex: 1, minWidth: "30px" }} />
        </div>
      </main>
      <footer className="footer">
        <div>
          <span className="footer-tiny">&copy; 2024. Made with <span aria-label="hearts" role="img">💖</span>.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
