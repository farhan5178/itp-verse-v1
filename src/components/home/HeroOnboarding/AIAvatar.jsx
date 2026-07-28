import React from 'react';

/**
 * AIAvatar
 * Pure SVG robot character with CSS keyframe animations.
 * No external dependencies — fully self-contained.
 *
 * Props:
 *   isReady {boolean} — true once the walk-in animation completes.
 *                       Activates idle float, blink, arm-wave, antenna-pulse.
 */
export default function AIAvatar({ isReady }) {
  return (
    <div
      className="relative select-none"
      style={{ width: 200, height: 290 }}
    >
      {/* Ambient glow orb behind avatar */}
      <div
        aria-hidden="true"
        style={{
          position:        'absolute',
          width:           240,
          height:          240,
          top:             '5%',
          left:            '50%',
          transform:       'translateX(-50%)',
          borderRadius:    '50%',
          background:      'radial-gradient(circle, rgba(0,151,178,0.30) 0%, rgba(0,75,89,0.20) 55%, transparent 100%)',
          filter:          'blur(30px)',
          animation:       'antennaPulse 3s ease-in-out infinite',
          pointerEvents:   'none',
        }}
      />

      {/* Floating body wrapper */}
      <div style={{ animation: isReady ? 'avatarFloat 3.5s ease-in-out infinite' : 'none' }}>
        <svg viewBox="0 0 200 270" width="200" height="270" role="img" aria-label="Edwaay AI Assistant">
          <defs>
            <linearGradient id="hg"  x1="0%" y1="0%"  x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#0097B2" />
              <stop offset="100%" stopColor="#00788E" />
            </linearGradient>
            <linearGradient id="bg2" x1="0%" y1="0%"  x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#00788E" />
              <stop offset="100%" stopColor="#004B59" />
            </linearGradient>
            <linearGradient id="sg"  x1="0%" y1="0%"  x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#091b20" />
              <stop offset="100%" stopColor="#061317" />
            </linearGradient>
            <linearGradient id="ag"  x1="0%" y1="0%"  x2="0%"   y2="100%">
              <stop offset="0%"   stopColor="#0097B2" />
              <stop offset="100%" stopColor="#004B59" />
            </linearGradient>
            <linearGradient id="vg"  x1="0%" y1="0%"  x2="100%" y2="100%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
            </linearGradient>
            <radialGradient id="eye-shine" cx="30%" cy="30%">
              <stop offset="0%"   stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <filter id="avatar-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="rgba(0,75,89,0.35)" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="100" cy="265" rx="48" ry="7"
            fill="rgba(0,75,89,0.15)"
            style={{ animation: 'shadowPulse 3.5s ease-in-out infinite' }}
          />

          {/* ── Legs ── */}
          <rect x="74" y="210" width="18" height="42" rx="9" fill="url(#bg2)" />
          <rect x="108" y="210" width="18" height="42" rx="9" fill="url(#bg2)" />
          {/* Feet */}
          <ellipse cx="83"  cy="251" rx="13" ry="7" fill="url(#hg)" />
          <ellipse cx="117" cy="251" rx="13" ry="7" fill="url(#hg)" />

          {/* ── Body ── */}
          <rect x="58" y="148" width="84" height="72" rx="18" fill="url(#bg2)" filter="url(#avatar-shadow)" />
          {/* Screen panel */}
          <rect x="70" y="160" width="60" height="42" rx="8" fill="url(#sg)" />
          {/* Status dots */}
          <circle cx="85"  cy="175" r="5" fill="#0097B2"
            style={{ animation: 'antennaPulse 1.6s ease-in-out infinite' }}
          />
          <circle cx="100" cy="175" r="5" fill="rgba(255,255,255,0.28)" />
          <circle cx="115" cy="175" r="5" fill="#48cae4"
            style={{ animation: 'antennaPulse 1.6s ease-in-out infinite 0.5s' }}
          />
          {/* Progress bars */}
          <rect x="78" y="188" width="44" height="4" rx="2" fill="rgba(0,151,178,0.55)" />
          <rect x="78" y="196" width="28" height="4" rx="2" fill="rgba(255,255,255,0.18)" />

          {/* ── Left arm (static) ── */}
          <rect x="28"  y="155" width="32" height="16" rx="8" fill="url(#ag)" />
          <circle cx="24" cy="163" r="11" fill="url(#hg)" />
          <rect x="13" y="158" width="7" height="4" rx="2" fill="url(#ag)" />
          <rect x="13" y="163" width="7" height="4" rx="2" fill="url(#ag)" />
          <rect x="13" y="168" width="7" height="4" rx="2" fill="url(#ag)" />

          {/* ── Right arm — WAVES on entrance ── */}
          <g style={{
            transformOrigin: '145px 162px',
            animation: isReady ? 'armWave 0.85s ease-in-out 0.1s 2' : 'none',
          }}>
            <rect x="140" y="155" width="32" height="16" rx="8" fill="url(#ag)" />
            <circle cx="176" cy="163" r="11" fill="url(#hg)" />
            <rect x="180" y="158" width="7" height="4" rx="2" fill="url(#ag)" />
            <rect x="180" y="163" width="7" height="4" rx="2" fill="url(#ag)" />
            <rect x="180" y="168" width="7" height="4" rx="2" fill="url(#ag)" />
          </g>

          {/* ── Neck ── */}
          <rect x="90" y="133" width="20" height="18" rx="6" fill="url(#hg)" />
          <line x1="95" y1="137" x2="95" y2="148" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="105" y1="137" x2="105" y2="148" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

          {/* ── Head ── */}
          <rect x="52" y="52" width="96" height="86" rx="24" fill="url(#hg)" filter="url(#avatar-shadow)" />
          {/* Glass shine */}
          <rect x="58" y="57" width="84" height="30" rx="16" fill="url(#vg)" />
          {/* Ear tabs */}
          <rect x="44"  y="75" width="10" height="22" rx="5" fill="url(#bg2)" />
          <rect x="146" y="75" width="10" height="22" rx="5" fill="url(#bg2)" />
          {/* Ear lights */}
          <circle cx="49"  cy="86" r="3" fill="#0097B2"
            style={{ animation: 'antennaPulse 2s ease-in-out infinite 0.3s' }}
          />
          <circle cx="151" cy="86" r="3" fill="#48cae4"
            style={{ animation: 'antennaPulse 2s ease-in-out infinite 0.8s' }}
          />

          {/* ── Left Eye ── */}
          <g style={{
            transformOrigin: '82px 95px',
            animation: isReady ? 'eyeBlink 4.5s ease-in-out infinite 1.2s' : 'none',
          }}>
            <ellipse cx="82" cy="95" rx="13" ry="15" fill="white" />
            <circle  cx="85" cy="97" r="8"  fill="#091b20" />
            <circle  cx="83" cy="93" r="4"  fill="url(#eye-shine)" />
            <circle  cx="88" cy="100" r="2" fill="rgba(255,255,255,0.45)" />
          </g>

          {/* ── Right Eye ── */}
          <g style={{
            transformOrigin: '118px 95px',
            animation: isReady ? 'eyeBlink 4.5s ease-in-out infinite 1.2s' : 'none',
          }}>
            <ellipse cx="118" cy="95" rx="13" ry="15" fill="white" />
            <circle  cx="121" cy="97" r="8"  fill="#091b20" />
            <circle  cx="119" cy="93" r="4"  fill="url(#eye-shine)" />
            <circle  cx="124" cy="100" r="2" fill="rgba(255,255,255,0.45)" />
          </g>

          {/* ── Smile ── */}
          <path
            d="M 84 120 Q 100 133 116 120"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="3" fill="none" strokeLinecap="round"
          />

          {/* ── Cheek blush ── */}
          <ellipse cx="68"  cy="110" rx="8" ry="5" fill="rgba(0,151,178,0.22)" />
          <ellipse cx="132" cy="110" rx="8" ry="5" fill="rgba(0,151,178,0.22)" />

          {/* ── Antenna ── */}
          <line x1="100" y1="52" x2="100" y2="30"
            stroke="url(#hg)" strokeWidth="5" strokeLinecap="round"
          />
          <circle cx="100" cy="22" r="11" fill="rgba(0,151,178,0.22)"
            style={{ animation: 'antennaPulse 2s ease-in-out infinite' }}
          />
          <circle cx="100" cy="22" r="7" fill="#0097B2" />
          <circle cx="100" cy="22" r="4" fill="#1AB0CB" />
          <circle cx="98"  cy="20" r="1.5" fill="white" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
