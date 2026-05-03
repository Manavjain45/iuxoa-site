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

export default function TermsOfService() {
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
            Legal · Terms
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1rem', lineHeight: 1.1, color: '#111' }}>
            Terms of Service
          </h1>
          <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '0.85rem' }}>
            Last updated: May 1, 2026 &nbsp;·&nbsp; Effective: May 1, 2026
          </p>
        </div>

        <Section title="1. Acceptance of Terms">
          <P>By accessing or using IUXOA's website or services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</P>
          <P>We reserve the right to update these terms at any time without prior notice. Your continued use of our services after changes are posted constitutes your acceptance of the revised terms.</P>
        </Section>

        <Section title="2. Services">
          <P>IUXOA provides digital services including but not limited to:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li>Web design and development</Li>
            <Li>Mobile application development</Li>
            <Li>Game development</Li>
            <Li>UI/UX design</Li>
            <Li>Research and academic paper writing</Li>
            <Li>Branding and graphic design</Li>
          </ul>
          <P>The scope, timeline, and deliverables for each project are defined in a separate project agreement or proposal provided to the client before work commences.</P>
        </Section>

        <Section title="3. Client Responsibilities">
          <P>As a client, you agree to:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li>Provide accurate and complete project information in a timely manner.</Li>
            <Li>Review and provide feedback on deliverables within the agreed timeframe.</Li>
            <Li>Ensure you have the rights to any content, images, or assets provided to us.</Li>
            <Li>Make payments according to the agreed schedule.</Li>
            <Li>Not use our services for any unlawful or prohibited purpose.</Li>
          </ul>
        </Section>

        <Section title="4. Payment Terms">
          <P>All project fees are outlined in the project proposal. Unless otherwise agreed:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li>A deposit of 50% is required before work begins.</Li>
            <Li>The remaining balance is due upon project completion before final delivery.</Li>
            <Li>Invoices are due within 7 business days of issuance.</Li>
            <Li>Late payments may incur a 2% monthly interest charge.</Li>
          </ul>
          <P>All prices are in Indian Rupees (INR) unless otherwise specified. Prices do not include applicable taxes.</P>
        </Section>

        <Section title="5. Intellectual Property">
          <P><strong style={{ color: '#111' }}>Our Work:</strong> Upon receipt of full payment, the client receives full ownership of the final deliverables (design files, code, etc.) created specifically for their project.</P>
          <P><strong style={{ color: '#111' }}>Our Tools & Frameworks:</strong> IUXOA retains ownership of any proprietary tools, frameworks, libraries, or methodologies used in the creation of deliverables. A non-exclusive license to use these is granted to the client.</P>
          <P><strong style={{ color: '#111' }}>Portfolio Rights:</strong> IUXOA reserves the right to display completed work in its portfolio unless the client requests confidentiality in writing.</P>
        </Section>

        <Section title="6. Revisions & Change Requests">
          <P>Each project includes a defined number of revision rounds as specified in the project proposal. Additional revisions beyond the agreed scope will be billed at our standard hourly rate.</P>
          <P>Significant changes to project scope after commencement may require a revised proposal and additional fees.</P>
        </Section>

        <Section title="7. Turnaround Time & Delays">
          <P>IUXOA will make reasonable efforts to meet agreed deadlines. However, timelines may be affected by:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li>Delayed feedback or approvals from the client.</Li>
            <Li>Changes to the project scope.</Li>
            <Li>Technical issues or circumstances beyond our control.</Li>
          </ul>
          <P>IUXOA is not liable for any loss resulting from delays caused by client inaction or third-party factors.</P>
        </Section>

        <Section title="8. Cancellation & Refunds">
          <P>Either party may terminate a project with written notice. In such cases:</P>
          <ul style={{ paddingLeft: '1.4rem', margin: '0 0 0.9rem' }}>
            <Li>The client is responsible for payment of all work completed up to the date of termination.</Li>
            <Li>Deposits are non-refundable once work has commenced.</Li>
            <Li>Completed and approved deliverables are non-refundable.</Li>
          </ul>
          <P>Refund requests for work not yet started will be evaluated on a case-by-case basis.</P>
        </Section>

        <Section title="9. Confidentiality">
          <P>Both parties agree to keep confidential any proprietary or sensitive information disclosed during the course of the project. This includes business strategies, technical details, and client data. This obligation survives termination of the agreement.</P>
        </Section>

        <Section title="10. Limitation of Liability">
          <P>To the maximum extent permitted by law, IUXOA shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services, even if advised of the possibility of such damages.</P>
          <P>Our total liability for any claim shall not exceed the total fees paid by the client for the specific project giving rise to the claim.</P>
        </Section>

        <Section title="11. Warranties & Disclaimers">
          <P>IUXOA warrants that all work will be performed professionally and in accordance with industry standards. We do not guarantee specific business outcomes, rankings, or performance metrics resulting from our work.</P>
          <P>Our website and services are provided "as is" without warranty of any kind, express or implied.</P>
        </Section>

        <Section title="12. Governing Law">
          <P>These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in Punjab, India.</P>
        </Section>

        <Section title="13. Contact Us">
          <P>If you have any questions about these Terms of Service, please contact us:</P>
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
