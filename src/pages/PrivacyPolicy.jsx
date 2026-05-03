import React, { useState, useCallback } from 'react';
import Navigation from '../components/agency/Navigation';
import ContactFooter from '../components/agency/ContactFooter';
import SplashScreen from '../components/agency/SplashScreen';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontFamily: SANS, fontSize: '1.15rem', fontWeight: 700, color: '#111', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
      {title}
    </h2>
    <div style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.85 }}>
      {children}
    </div>
  </div>
);

const P = ({ children }) => <p style={{ margin: '0 0 0.9rem' }}>{children}</p>;
const Li = ({ children }) => <li style={{ marginBottom: '0.45rem', paddingLeft: '0.25rem' }}>{children}</li>;

export default function PrivacyPolicy() {
  const [showSplash, setShowSplash] = useState(true);
  const handleComplete = useCallback(() => setShowSplash(false), []);
  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      <div style={{ background: '#fff', minHeight: '100vh', color: '#111', fontFamily: SANS }}>
      <Navigation />

      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '9rem 8% 6rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: '0.75rem' }}>
            Legal · Privacy
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1rem', lineHeight: 1.1, color: '#111' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '0.85rem' }}>
            Last updated: May 1, 2026 &nbsp;·&nbsp; Effective: May 1, 2026
          </p>
        </div>

        <Section title="1. Introduction">
          <P>Welcome to IUXOA ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.</P>
          <P>Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.</P>
        </Section>

        <Section title="2. Information We Collect">
          <P>We may collect information about you in a variety of ways, including:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li><strong>Personal Data:</strong> Name, email address, phone number, and other contact details you voluntarily provide via our contact forms.</Li>
            <Li><strong>Usage Data:</strong> Pages visited, time spent on pages, browser type, IP address, and referring URL — collected automatically via analytics tools.</Li>
            <Li><strong>Communication Data:</strong> Messages, project briefs, and attachments you send us through any communication channel.</Li>
          </ul>
          <P>We do not collect sensitive personal information such as financial data, health records, or government ID numbers.</P>
        </Section>

        <Section title="3. How We Use Your Information">
          <P>We use the information we collect to:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li>Respond to your inquiries and provide requested services.</Li>
            <Li>Send project updates, proposals, and relevant communications.</Li>
            <Li>Improve our website experience and service quality.</Li>
            <Li>Comply with legal obligations and resolve disputes.</Li>
            <Li>Send occasional marketing emails (you may opt out at any time).</Li>
          </ul>
        </Section>

        <Section title="4. Sharing Your Information">
          <P>We do not sell, trade, or rent your personal information to third parties. We may share your data with:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li><strong>Service Providers:</strong> Trusted vendors who assist in operating our website (e.g., hosting, analytics, email delivery).</Li>
            <Li><strong>Legal Requirements:</strong> When required by law, court order, or government authority.</Li>
            <Li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</Li>
          </ul>
        </Section>

        <Section title="5. Cookies & Tracking Technologies">
          <P>Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of our site may not function properly without cookies.</P>
          <P>We use cookies for: session management, analytics (Google Analytics), and preference storage.</P>
        </Section>

        <Section title="6. Data Retention">
          <P>We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Contact form submissions are typically retained for up to 2 years.</P>
        </Section>

        <Section title="7. Your Rights">
          <P>Depending on your location, you may have the following rights regarding your personal data:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li>Right to access — request a copy of your data.</Li>
            <Li>Right to rectification — request correction of inaccurate data.</Li>
            <Li>Right to erasure — request deletion of your data.</Li>
            <Li>Right to restrict processing — request that we limit how we use your data.</Li>
            <Li>Right to data portability — request your data in a machine-readable format.</Li>
          </ul>
          <P>To exercise any of these rights, contact us at <a href="mailto:duneli.iuxoa@gmail.com" style={{ color: '#FF4D00', textDecoration: 'none', fontWeight: 600 }}>duneli.iuxoa@gmail.com</a>.</P>
        </Section>

        <Section title="8. Third-Party Links">
          <P>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policy of every site you visit.</P>
        </Section>

        <Section title="9. Children's Privacy">
          <P>Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.</P>
        </Section>

        <Section title="10. Security">
          <P>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</P>
        </Section>

        <Section title="11. Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the "Last updated" date at the top of this page. Continued use of our site after changes constitutes acceptance of the updated policy.</P>
        </Section>

        <Section title="12. Contact Us">
          <P>If you have any questions about this Privacy Policy, please contact us:</P>
          <div style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 10, padding: '1.2rem 1.5rem', marginTop: '0.5rem' }}>
            <p style={{ margin: '0 0 0.3rem', fontWeight: 600, color: '#111' }}>IUXOA Studio</p>
            <p style={{ margin: '0 0 0.3rem', color: 'rgba(0,0,0,0.5)', fontSize: '0.9rem' }}>Chandigarh University, NH-95, Mohali, Punjab 140413</p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              <a href="mailto:duneli.iuxoa@gmail.com" style={{ color: '#FF4D00', textDecoration: 'none', fontWeight: 600 }}>duneli.iuxoa@gmail.com</a>
            </p>
          </div>
        </Section>

      </div>

      <ContactFooter />
      </div>
    </>
  );
}
