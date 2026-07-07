import LegalDoc from './LegalDoc';

/*
 * REVIEW NOTE (not rendered): Confirm the registered legal entity name/address and
 * have a lawyer review before production. Governing law is stated as India.
 */

export default function Terms() {
  return (
    <LegalDoc
      title="Terms & Conditions"
      updated="7 July 2026"
      lede="These terms govern your use of the BuildspaceLabs website. By using the Site, you agree to them. Any paid engagement is governed by a separate written agreement, not this page."
    >
      <h2>Acceptance of these terms</h2>
      <p>
        By accessing or using <strong>buildspacelabs.com</strong> (the &ldquo;Site&rdquo;), you agree
        to these Terms &amp; Conditions. If you do not agree, please do not use the Site.
      </p>

      <h2>Who we are</h2>
      <p>
        BuildspaceLabs is an AI-native product studio and engineering lab, operated by Vruoom and
        based in India. The Site is an informational and marketing website. It is not an offer to
        contract, and using it does not create a client relationship. Any engagement begins only
        under a separate signed proposal or agreement.
      </p>

      <h2>The &ldquo;Get Your Offer&rdquo; tool</h2>
      <p>
        The offer tool produces an <strong>indicative, non-binding estimate</strong> based on the
        limited information you provide and generated in part by an automated model. It is not a
        quote, a commitment, or professional advice. Final scope, timeline, and pricing are set only
        in a written proposal we agree with you.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Site and its content — including text, design, graphics, logos, and the BuildspaceLabs
        name and marks — are owned by us or our licensors and are protected by law. Case studies and
        portfolio work are shown with the rights or permissions we hold. You may not copy,
        reproduce, or reuse Site content for commercial purposes without our prior written consent.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Site for any unlawful purpose or in breach of these terms.</li>
        <li>Attempt to gain unauthorised access to the Site or its underlying systems.</li>
        <li>Submit false, abusive, infringing, or malicious content through any form or tool.</li>
        <li>Interfere with the Site&rsquo;s operation, security, or availability.</li>
      </ul>

      <h2>Third-party links</h2>
      <p>
        The Site may link to third-party websites and services we do not control. We are not
        responsible for their content, terms, or privacy practices, and a link does not imply
        endorsement.
      </p>

      <h2>No warranties</h2>
      <p>
        The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We
        make no warranties, express or implied, about the Site&rsquo;s accuracy, completeness,
        reliability, or fitness for a particular purpose, to the fullest extent permitted by law.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, BuildspaceLabs and Vruoom will not be liable for any
        indirect, incidental, special, or consequential damages arising from your use of, or
        inability to use, the Site or any information on it.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, and any dispute relating to the Site will be
        subject to the exclusive jurisdiction of the competent courts in India.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Changes take effect when posted here, and we
        will revise the &ldquo;Last updated&rdquo; date above. Your continued use of the Site means
        you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{' '}
        <a href="mailto:buildspacelabs@vruoom.com">buildspacelabs@vruoom.com</a>.
      </p>
    </LegalDoc>
  );
}
