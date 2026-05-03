import React, { useEffect, useRef, useState } from 'react';

/* ── Color map ── */
const glowColorMap = {
  blue:   { color: '#3b82f6', glow: '59,130,246' },
  purple: { color: '#a855f7', glow: '168,85,247' },
  green:  { color: '#22c55e', glow: '34,197,94'  },
  red:    { color: '#ef4444', glow: '239,68,68'  },
  orange: { color: '#FF4D2D', glow: '255,77,45'  },
  yellow: { color: '#eab308', glow: '234,179,8'  },
  white:  { color: '#ffffff', glow: '255,255,255' },
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

/* ── Inject base card styles once ── */
const BASE_STYLES = `
  .glow-card-root {
    position: relative;
    isolation: isolate;
    border-radius: var(--gc-radius, 20px);
    background: var(--gc-bg, hsl(0 0% 7% / 1));
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
  }

  /* The static border */
  .glow-card-root::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--gc-radius, 20px);
    border: 1px solid rgba(255,255,255,0.08);
    pointer-events: none;
    z-index: 3;
    transition: border-color 0.3s ease;
  }

  .glow-card-root:hover::before {
    border-color: rgba(255,255,255,0.14);
  }

  .glow-card-root:hover {
    transform: translateY(-5px);
  }

  /* Bottom glow beam — always visible, pulses on hover */
  .glow-card-beam {
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 3px;
    border-radius: 999px;
    z-index: 4;
    pointer-events: none;
    transition: opacity 0.4s ease, width 0.4s ease;
  }

  /* Outer bloom underneath the beam */
  .glow-card-bloom {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 120px;
    border-radius: 50%;
    filter: blur(28px);
    z-index: 0;
    pointer-events: none;
    opacity: 0.55;
    transition: opacity 0.4s ease, width 0.4s ease;
  }

  .glow-card-root:hover .glow-card-bloom {
    opacity: 0.85;
    width: 95%;
  }

  .glow-card-root:hover .glow-card-beam {
    width: 85%;
    opacity: 1;
  }

  /* Mouse spotlight inside card */
  .glow-card-spot {
    position: absolute;
    inset: 0;
    border-radius: var(--gc-radius, 20px);
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .glow-card-root:hover .glow-card-spot {
    opacity: 1;
  }

  /* Content sits above all overlays */
  .glow-card-content {
    position: relative;
    z-index: 2;
  }
`;

if (typeof document !== 'undefined') {
  if (!document.getElementById('glow-card-base-styles')) {
    const tag = document.createElement('style');
    tag.id = 'glow-card-base-styles';
    tag.textContent = BASE_STYLES;
    document.head.appendChild(tag);
  }
}

/* ── GlowCard component ── */
const GlowCard = ({
  children,
  className = '',
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
  style = {},
}) => {
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const { color, glow } = glowColorMap[glowColor] || glowColorMap.blue;

  /* Mouse-tracking inner spotlight */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (spotRef.current) {
        spotRef.current.style.background =
          `radial-gradient(380px circle at ${x}px ${y}px, rgba(${glow},0.08), transparent 65%)`;
      }
    };

    card.addEventListener('mousemove', onMove);
    return () => card.removeEventListener('mousemove', onMove);
  }, [glow]);

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size] || sizeMap.md;
  };

  const rootStyle = {
    '--gc-radius': '20px',
    '--gc-bg': 'hsl(0 0% 7% / 1)',
    ...(width  !== undefined ? { width:  typeof width  === 'number' ? `${width}px`  : width  } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return (
    <div
      ref={cardRef}
      className={`glow-card-root ${getSizeClasses()} ${!customSize ? 'aspect-[3/4]' : ''} ${className}`}
      style={rootStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Bottom bloom */}
      <div
        className="glow-card-bloom"
        style={{ background: `radial-gradient(ellipse at center, rgba(${glow},0.7) 0%, transparent 70%)` }}
      />

      {/* Bottom beam line */}
      <div
        className="glow-card-beam"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)`,
          boxShadow: `0 0 12px 3px rgba(${glow},0.9), 0 0 30px 6px rgba(${glow},0.4)`,
        }}
      />

      {/* Mouse spotlight */}
      <div ref={spotRef} className="glow-card-spot" />

      {/* Content */}
      <div className="glow-card-content" style={{ height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

export { GlowCard };
