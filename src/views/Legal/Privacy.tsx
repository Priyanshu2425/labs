import LegalDoc from './LegalDoc';

/*
 * REVIEW NOTE (not rendered): This policy is grounded in the site's real data flows
 * (contact form, the "Get Your Offer" AI tool, Cloudflare/Resend/LLM providers).
 * Before production, confirm with the user: (1) the exact registered legal entity
 * name and registered office address, (2) the canonical privacy contact inbox,
 * and (3) have a lawyer review. Governing law is stated as India (DPDP Act 2023).
 */

export default function Privacy() {
  return (
    <LegalDoc
      title="Privacy Policy"
      updated="7 July 2026"
      lede="This policy explains what information BuildspaceLabs collects through this website, how we use it, and the choices you have. We keep data collection to the minimum needed to respond to you and run the site."
    >
      <h2>Who we are</h2>
      <p>
        BuildspaceLabs is an AI-native product studio and engineering lab, operated by Vruoom and
        based in India. This policy applies to the website at{' '}
        <strong>buildspacelabs.com</strong> (the &ldquo;Site&rdquo;). It does not cover any separate
        product, subdomain, or client engagement, which are governed by their own agreements.
      </p>

      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>
          <strong>Contact enquiries.</strong> When you use a contact form, we collect the name,
          email address, company (if provided), and the message you send so we can reply.
        </li>
        <li>
          <strong>&ldquo;Get Your Offer&rdquo; tool.</strong> When you use the offer tool, we
          collect your name, email, the persona and budget range you select, and the project
          description you enter, so we can generate an indicative estimate and follow up.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage data.</strong> If website analytics is enabled, we collect standard,
          aggregated information such as pages viewed, referring source, approximate location, and
          device/browser type. This is used to understand traffic, not to identify you personally.
        </li>
        <li>
          <strong>Security data.</strong> Our hosting and bot-protection providers process request
          metadata (such as IP address) to keep the Site secure and prevent abuse.
        </li>
      </ul>

      <h2>Cookies and local storage</h2>
      <p>
        We keep cookies to a minimum. The offer tool stores your progress in your browser&rsquo;s
        local storage so you don&rsquo;t lose your place; this stays on your device. If analytics is
        enabled, it may set cookies to measure aggregate traffic. You can clear cookies and local
        storage at any time through your browser settings.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiries and prepare proposals or estimates.</li>
        <li>To operate, maintain, and improve the Site.</li>
        <li>To protect the Site against spam, fraud, and abuse.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal information, and we do not use your contact
        details for unrelated marketing without your consent.
      </p>

      <h2>AI processing in the offer tool</h2>
      <p>
        The &ldquo;Get Your Offer&rdquo; tool sends the information you enter to a third-party large
        language model provider to generate a non-binding estimate. Please do not submit
        confidential, sensitive, or personal information about others in that field.
      </p>

      <h2>Service providers</h2>
      <p>We share data only with the providers that help us run the Site, including:</p>
      <ul>
        <li>Email delivery, so we can receive and reply to your messages.</li>
        <li>Hosting, content delivery, and bot protection.</li>
        <li>A large language model provider that powers the offer tool.</li>
        <li>Website analytics, where enabled.</li>
      </ul>
      <p>
        These providers process data on our behalf under their own terms and may operate in India
        and other countries.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep enquiry and offer-tool data only as long as needed to respond to you, pursue a
        possible engagement, and meet our legal and record-keeping obligations, after which we
        delete or anonymise it.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live — including under India&rsquo;s Digital Personal Data Protection
        Act, 2023, and, if you are in the EU/UK, the GDPR — you may have the right to access,
        correct, or delete the personal information we hold about you, and to object to or restrict
        certain processing. To exercise any of these rights, contact us using the details below and
        we will respond within the timeframe required by applicable law.
      </p>

      <h2>Data security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your information. No
        method of transmission or storage is completely secure, so we cannot guarantee absolute
        security.
      </p>

      <h2>Children</h2>
      <p>
        The Site is intended for a business audience and is not directed to children under 18. We do
        not knowingly collect personal information from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise the &ldquo;Last
        updated&rdquo; date above. Material changes will be reflected on this page.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy question or request, email{' '}
        <a href="mailto:buildspacelabs@vruoom.com">buildspacelabs@vruoom.com</a>.
      </p>
    </LegalDoc>
  );
}
