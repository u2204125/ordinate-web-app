import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Privacy',
  description: 'Terms of Service and Privacy Policy for Ordinate Studio',
};

export default function TermsAndPrivacyPage() {
  return (
    <div className="min-h-screen bg-ink text-cloud">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-base font-medium tracking-tight text-cloud">
            <Image src="/logo-dark-transparent.png" alt="Ordinate logo" width={42} height={42} className="text-cloud" />
            <span>Ordinate</span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-cloud/80 transition hover:bg-white/10 hover:text-cloud"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-cloud sm:text-5xl">
            Terms & Privacy
          </h1>
          <p className="text-lg text-cloud/60">
            Last updated: December 6, 2025
          </p>
        </div>

        {/* Terms of Service */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan to-cyan/40 rounded-full" />
            <h2 className="text-3xl font-bold tracking-tight text-cloud">
              Terms of Service
            </h2>
          </div>

          <div className="space-y-8 text-cloud/75 leading-relaxed">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">1. Acceptance of Terms</h3>
              <p>
                By accessing and using Ordinate Studio&apos;s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">2. Use License</h3>
              <p className="mb-3">
                Permission is granted to temporarily access the materials (information or software) on Ordinate Studio&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>Attempt to decompile or reverse engineer any software contained on Ordinate Studio&apos;s website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">3. Services Description</h3>
              <p>
                Ordinate Studio provides web application development, technical consulting, product design, and related digital services. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">4. Intellectual Property</h3>
              <p>
                All content included on this site, such as text, graphics, logos, images, and software, is the property of Ordinate Studio or its content suppliers and protected by international copyright laws. Unless otherwise stated in a separate agreement, all deliverables and intellectual property created for clients remain the property of the client upon full payment.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">5. Disclaimer</h3>
              <p>
                The materials on Ordinate Studio&apos;s website are provided on an &apos;as is&apos; basis. Ordinate Studio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">6. Limitations</h3>
              <p>
                In no event shall Ordinate Studio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ordinate Studio&apos;s website, even if Ordinate Studio or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">7. Revisions and Errata</h3>
              <p>
                The materials appearing on Ordinate Studio&apos;s website could include technical, typographical, or photographic errors. Ordinate Studio does not warrant that any of the materials on its website are accurate, complete, or current. Ordinate Studio may make changes to the materials contained on its website at any time without notice.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">8. Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Bangladesh and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-cyan to-cyan/40 rounded-full" />
            <h2 className="text-3xl font-bold tracking-tight text-cloud">
              Privacy Policy
            </h2>
          </div>

          <div className="space-y-8 text-cloud/75 leading-relaxed">
            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">1. Information We Collect</h3>
              <p className="mb-3">
                We collect information to provide better services to our users. The types of information we collect include:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and company details when you contact us or request our services</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and referring websites</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">2. How We Use Your Information</h3>
              <p className="mb-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To provide, maintain, and improve our services</li>
                <li>To communicate with you about our services, including responding to your inquiries</li>
                <li>To send you technical notices, updates, security alerts, and support messages</li>
                <li>To analyze usage patterns and optimize our website performance</li>
                <li>To protect against, identify, and prevent fraud and other illegal activities</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">3. Information Sharing</h3>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>With your consent or at your direction</li>
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations or protect our rights</li>
                <li>In connection with a merger, acquisition, or sale of assets (with notice to you)</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">4. Data Security</h3>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">5. Cookies and Tracking</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">6. Third-Party Links</h3>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">7. Your Rights</h3>
              <p className="mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Access, update, or delete your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">8. Data Retention</h3>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">9. Children&apos;s Privacy</h3>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">10. Changes to This Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-cloud">11. Contact Us</h3>
              <p>
                If you have any questions about these Terms or Privacy Policy, please contact us:
              </p>
              <ul className="list-none space-y-2 pl-4 mt-3">
                <li>Email: <a href="mailto:ordinate.bd70@gmail.com" className="text-cyan hover:underline">ordinate.bd70@gmail.com</a></li>
                <li>WhatsApp: <a href="https://wa.me/8801817118765" className="text-cyan hover:underline" target="_blank" rel="noopener noreferrer">+880 1817 118765</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 text-center">
          <p className="mb-4 text-cloud/70">
            Have questions about our terms or privacy practices?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink transition hover:bg-cyan/90"
          >
            Get in Touch
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-ink/95 text-cloud">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" aria-hidden />
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-cloud/50">
          <p>© {new Date().getFullYear()} Ordinate Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
