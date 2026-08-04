import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';

const BRAND = '#C8502A';

function getFileExt(url) {
  try {
    return url.split('?')[0].split('.').pop().toLowerCase();
  } catch {
    return '';
  }
}
const IMAGE_EXT = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];

// Status: 'idle' | 'loading' | 'not_found' | 'found' | 'claimed' | 'error'
export default function CertificateClaim() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const [refNumber, setRefNumber] = useState('');
  const [status, setStatus] = useState('idle');
  const [certificate, setCertificate] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);
  const [downloadNote, setDownloadNote] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = refNumber.trim();
    if (!query) return;

    setStatus('loading');
    setCertificate(null);
    setImgBroken(false);
    setDownloadNote('');

    const { data, error } = await supabase
      .from('certificates')
      .select('id, ref_number, holder_name, certificate_url, claimed')
      .ilike('ref_number', query)
      .maybeSingle();

    if (error) {
      console.error('[CertificateClaim] fetch error:', error);
      setStatus('error');
      return;
    }

    if (!data) {
      setStatus('not_found');
      return;
    }

    setCertificate(data);
    setStatus('found');
  };

  const handleClaim = async () => {
    if (!certificate) return;
    setClaiming(true);

    // Trigger the actual download
    let downloaded = false;
    try {
      const res = await fetch(certificate.certificate_url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      const ext = certificate.certificate_url.split('.').pop().split('?')[0];
      a.download = `Certificate-${certificate.ref_number}.${ext || 'png'}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      downloaded = true;
      setDownloadNote('Claimed & downloaded — check your downloads folder');
    } catch (err) {
      console.error('[CertificateClaim] download error:', err);
      // Fallback: open in new tab if blob fetch fails (e.g. CORS, broken link)
      window.open(certificate.certificate_url, '_blank', 'noopener,noreferrer');
      setDownloadNote('Could not auto-download — opened the certificate link in a new tab instead');
    }

    // Fire-and-forget: mark claimed in DB, non-blocking for UX
    supabase
      .from('certificates')
      .update({ claimed: true, claimed_at: new Date().toISOString() })
      .eq('id', certificate.id)
      .then(() => {});

    setStatus('claimed');
    setClaiming(false);
  };

  const resetSearch = () => {
    setStatus('idle');
    setCertificate(null);
    setRefNumber('');
  };

  return (
    <div ref={ref} style={{ background: '#080808', padding: '7rem 5% 8rem', position: 'relative', overflow: 'hidden' }}>

      {/* BG glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%',
        background: `radial-gradient(circle, ${BRAND}11 0%, transparent 70%)`, filter: 'blur(90px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* eyebrow */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '1.2rem' }}>
          <div style={{ width: 28, height: 1, background: BRAND }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
            letterSpacing: '0.22em', textTransform: 'uppercase', color: BRAND }}>(CERTIFICATE PORTAL)</span>
          <div style={{ width: 28, height: 1, background: BRAND }} />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#e8e6e0',
            textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 0.8rem',
          }}>
          CLAIM YOUR <span style={{ color: BRAND, textShadow: `0 0 60px ${BRAND}66` }}>CERTIFICATE</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.42)',
            lineHeight: 1.7, maxWidth: 460, margin: '0 auto 2.6rem' }}>
          Enter the reference number printed on your certificate to verify and download it.
        </motion.p>

        {/* Search bar */}
        <motion.form onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="text"
            value={refNumber}
            onChange={(e) => setRefNumber(e.target.value)}
            placeholder="e.g. IUXOA-CERT-2026-0042"
            style={{
              flex: '1 1 260px', fontFamily: "'DM Mono', monospace", fontSize: '0.85rem',
              color: '#fff', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
              padding: '14px 18px', outline: 'none', letterSpacing: '0.04em',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = BRAND; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          />
          <motion.button type="submit" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            disabled={status === 'loading'}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', padding: '14px 26px', borderRadius: 10,
              background: BRAND, color: '#fff', border: 'none', cursor: 'pointer',
              boxShadow: `0 0 25px ${BRAND}55`, opacity: status === 'loading' ? 0.6 : 1,
            }}>
            {status === 'loading' ? 'Searching…' : 'Verify'}
          </motion.button>
        </motion.form>

        {/* Result states */}
        <AnimatePresence mode="wait">
          {status === 'not_found' && (
            <motion.div key="not-found"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ marginTop: '2rem', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem',
                color: '#e85533', background: 'rgba(232,85,51,0.08)', border: '1px solid rgba(232,85,51,0.25)',
                borderRadius: 10, padding: '1rem 1.4rem', maxWidth: 460, margin: '2rem auto 0' }}>
              No certificate found for this reference number. Double-check and try again.
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div key="error"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              style={{ marginTop: '2rem', fontFamily: "'Inter', sans-serif", fontSize: '0.88rem',
                color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '1rem 1.4rem', maxWidth: 460, margin: '2rem auto 0' }}>
              Something went wrong while verifying. Please try again in a moment.
            </motion.div>
          )}

          {(status === 'found' || status === 'claimed') && certificate && (
            <motion.div key="cert"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: '2.6rem', maxWidth: 860, margin: '2.6rem auto 0' }}>

              <div style={{
                position: 'relative', borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${status === 'claimed' ? BRAND + '55' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: status === 'claimed' ? `0 0 50px ${BRAND}33` : '0 20px 60px rgba(0,0,0,0.5)',
                minHeight: 320, background: '#111',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {!imgBroken && IMAGE_EXT.includes(getFileExt(certificate.certificate_url)) && (
                  <img
                    src={certificate.certificate_url}
                    alt={`Certificate ${certificate.ref_number}`}
                    onError={() => setImgBroken(true)}
                    style={{
                      width: '100%', maxHeight: 640, objectFit: 'contain', display: 'block', background: '#111',
                      filter: status === 'found' ? 'blur(16px) brightness(0.7)' : 'blur(0px) brightness(1)',
                      transition: 'filter 0.6s ease',
                    }}
                  />
                )}

                {getFileExt(certificate.certificate_url) === 'pdf' && (
                  <div style={{ width: '100%', aspectRatio: '1.4 / 1', position: 'relative', background: '#fff', overflow: 'hidden' }}>
                    <iframe
                      src={`${certificate.certificate_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={`Certificate ${certificate.ref_number}`}
                      scrolling="no"
                      style={{
                        position: 'absolute', top: '-10%', left: '-10%',
                        width: '120%', height: '120%', border: 'none', display: 'block',
                        filter: status === 'found' ? 'blur(16px) brightness(0.85)' : 'blur(0px) brightness(1)',
                        transition: 'filter 0.6s ease',
                        pointerEvents: status === 'found' ? 'none' : 'auto',
                      }}
                    />
                  </div>
                )}

                {!IMAGE_EXT.includes(getFileExt(certificate.certificate_url)) && getFileExt(certificate.certificate_url) !== 'pdf' && (
                  <div style={{
                    width: '100%', padding: '4.5rem 2rem', textAlign: 'center',
                    filter: status === 'found' ? 'blur(9px)' : 'blur(0px)',
                    transition: 'filter 0.6s ease',
                  }}>
                    <div style={{
                      width: 78, height: 96, margin: '0 auto 1.4rem', borderRadius: 8,
                      background: 'linear-gradient(160deg, #1c1c1c, #0d0d0d)',
                      border: `1.5px solid ${BRAND}66`, position: 'relative',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: BRAND,
                        letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {getFileExt(certificate.certificate_url) || 'FILE'}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.4rem',
                      color: '#e8e6e0', letterSpacing: '-0.01em', marginBottom: 4 }}>
                      Certificate of {certificate.holder_name || 'Achievement'}
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.08em' }}>
                      REF: {certificate.ref_number}
                    </div>
                  </div>
                )}

                {imgBroken && IMAGE_EXT.includes(getFileExt(certificate.certificate_url)) && (
                  <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#e85533', marginBottom: 6 }}>
                      Certificate image link is broken or not public.
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
                      Check the certificate_url in Supabase — the storage bucket must be Public.
                    </div>
                  </div>
                )}

                {/* Center claim overlay */}
                {status === 'found' && (
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 14,
                    background: 'rgba(0,0,0,0.25)',
                  }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff',
                      background: 'rgba(0,0,0,0.5)', padding: '5px 12px', borderRadius: 100 }}>
                      {certificate.holder_name ? `Certificate for ${certificate.holder_name}` : 'Certificate found'}
                    </div>
                    <motion.button onClick={handleClaim} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      disabled={claiming}
                      style={{
                        fontFamily: "'DM Mono', monospace", fontSize: '0.8rem', letterSpacing: '0.14em',
                        textTransform: 'uppercase', padding: '16px 34px', borderRadius: 100,
                        background: BRAND, color: '#fff', border: 'none', cursor: 'pointer',
                        boxShadow: `0 0 35px ${BRAND}88`, opacity: claiming ? 0.7 : 1,
                      }}>
                      {claiming ? 'Unlocking…' : 'Claim & Download'}
                    </motion.button>
                  </div>
                )}
              </div>

              {status === 'claimed' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {downloadNote || 'Claimed'}
                  </span>
                </motion.div>
              )}

              <button onClick={resetSearch}
                style={{ marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'underline' }}>
                Search another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
