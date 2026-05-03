import React, { useRef, useCallback, forwardRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

// ── IdentityCardBody ─────────────────────────────────────────────────────────
export const IdentityCardBody = forwardRef(function IdentityCardBody(
  {
    fullName,
    place,
    about,
    avatarUrl,
    avatarText,
    scheme = 'plain',
    socials = [],
    displayAvatar = true,
    titleCss = {},
    cardCss = {},
    className = '',
  },
  ref
) {
  const isAccent = scheme === 'accented';

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        padding: '2rem',
        background: isAccent ? 'var(--accent-color)' : 'transparent',
        color: isAccent ? 'var(--on-accent-foreground)' : '#fff',
        height: '100%',
        boxSizing: 'border-box',
        ...cardCss,
      }}
      className={className}
    >
      {/* Avatar */}
      <div style={{ visibility: displayAvatar ? 'visible' : 'hidden', marginBottom: '1.5rem' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', overflow: 'hidden',
          border: '2px solid var(--accent-color)',
          outline: '4px solid rgba(0,0,0,0.3)',
          outlineOffset: '2px',
        }}>
          <img
            src={avatarUrl} alt={avatarText}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>

      {/* Place */}
      <p style={{
        fontSize: '0.78rem',
        color: isAccent ? 'var(--on-accent-muted-foreground)' : 'rgba(255,255,255,0.4)',
        margin: '0 0 0.25rem',
        letterSpacing: '0.04em',
      }}>
        {place}
      </p>

      {/* Name */}
      <h3 style={{
        fontSize: '1.6rem',
        fontWeight: 800,
        margin: '0 0 1.25rem',
        letterSpacing: '-0.02em',
        color: isAccent ? 'var(--on-accent-foreground)' : '#fff',
        ...titleCss,
      }}>
        {fullName}
      </h3>

      {/* About */}
      <p style={{
        fontSize: '0.92rem',
        lineHeight: 1.65,
        flexGrow: 1,
        color: isAccent ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.6)',
        margin: 0,
      }}>
        {about}
      </p>

      {/* Socials */}
      {socials.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', alignItems: 'center' }}>
          {socials.map(s => (
            <a
              key={s.id}
              href={s.url}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: isAccent ? 'var(--on-accent-muted-foreground)' : 'rgba(255,255,255,0.4)',
                transition: 'opacity 0.2s',
                display: 'flex',
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
});

// ── RevealCardContainer ───────────────────────────────────────────────────────
export const RevealCardContainer = forwardRef(function RevealCardContainer(
  {
    base,
    overlay,
    accent = '#FF4D00',
    textOnAccent = '#fff',
    mutedOnAccent = 'rgba(255,255,255,0.7)',
    className = '',
    style = {},
    ...rest
  },
  ref
) {
  const holderRef = useRef(null);
  const overlayRef = useRef(null);

  const startClip = 'circle(50px at 64px 64px)';
  const expandClip = 'circle(160% at 64px 64px)';

  const assignRef = useCallback((el) => {
    holderRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  }, [ref]);

  useGSAP(() => {
    gsap.set(overlayRef.current, { clipPath: startClip });
  }, { scope: holderRef });

  const reveal = () => {
    gsap.to(overlayRef.current, { clipPath: expandClip, duration: 0.8, ease: 'expo.inOut' });
  };
  const conceal = () => {
    gsap.to(overlayRef.current, { clipPath: startClip, duration: 1, ease: 'expo.out' });
  };

  return (
    <div
      ref={assignRef}
      onMouseEnter={reveal}
      onMouseLeave={conceal}
      style={{
        '--accent-color': accent,
        '--on-accent-foreground': textOnAccent,
        '--on-accent-muted-foreground': mutedOnAccent,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        border: '2px solid var(--accent-color)',
        ...style,
      }}
      className={className}
      {...rest}
    >
      {/* Base layer */}
      <div>{base}</div>

      {/* Overlay layer — clip-path revealed on hover */}
      <div
        ref={overlayRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {overlay}
      </div>
    </div>
  );
});
