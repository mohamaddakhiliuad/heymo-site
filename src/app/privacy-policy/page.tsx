// app/privacy-policy/page.tsx

import Script from 'next/script'

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      {/* JSON-LD Structured Data */}
      <Script
        id="ld-json-privacy-policy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PrivacyPolicy',
            name: 'Rumilander Art Privacy Policy',
            url: 'https://rumilander.art/privacy-policy',
            publisher: {
              '@type': 'Organization',
              name: 'Rumilander Art',
              url: 'https://rumilander.art',
            },
          }),
        }}
      />

      <h1 className="text-4xl font-serif font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Effective Date: [Insert Date]</p>

      <section className="space-y-6">
        <p>
          At Rumilander.art, operated by Noura Gallery, we are committed to
          protecting your privacy and ensuring that your personal information is
          handled in a safe and responsible manner.
        </p>

        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We may collect personal and non-personal information such as your name,
          email, and browsing data through cookies.
        </p>

        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <p>
          We use the information to respond to inquiries, process purchases, send
          updates (if opted in), and improve our website experience.
        </p>

        <h2 className="text-2xl font-semibold">3. Sharing Your Information</h2>
        <p>
          We do not sell your personal data. We may share it only with trusted
          partners or when required by law.
        </p>

        <h2 className="text-2xl font-semibold">4. Cookies and Tracking</h2>
        <p>
          Our site uses cookies to enhance browsing, analyze traffic, and
          personalize content.
        </p>

        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        <p>
          Email: info@rumilander.art <br />
          Phone: +1 (647) 482-0073
        </p>
      </section>
    </main>
  )
}
