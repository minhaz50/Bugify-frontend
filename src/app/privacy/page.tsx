import PublicNavbar from '@/components/landing/PublicNavbar';
import Footer from '@/components/landing/Footer';
import { Shield } from 'lucide-react';

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account (name, email, password), submit issues (title, description, type), or contact us. We also collect basic usage data such as pages visited and features used to improve the product.' },
  { title: 'How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve DevPulse, authenticate your account, respond to your requests and support needs, and send product updates if you have opted in. We do not sell your personal data to third parties.' },
  { title: 'Data Storage & Security', content: 'All passwords are hashed using bcrypt before storage and are never stored in plain text. Authentication is handled via JWT tokens with expiry. Your data is stored on secure PostgreSQL servers. We use HTTPS for all data in transit.' },
  { title: 'Cookies & Local Storage', content: 'DevPulse uses localStorage to store your JWT token and user preferences (such as dark/light mode). We do not use tracking cookies or third-party advertising cookies.' },
  { title: 'Data Retention', content: 'We retain your account data for as long as your account is active. If you request account deletion, we will remove your personal data within 30 days, except where we are required to retain it by law.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You may also request a copy of your data in a portable format. To exercise these rights, contact us at privacy@devpulse.dev.' },
  { title: 'Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice in the application. Continued use of DevPulse after changes constitutes your acceptance of the updated policy.' },
  { title: 'Contact', content: 'If you have any questions about this Privacy Policy, please contact us at privacy@devpulse.dev or through our Contact page.' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PublicNavbar />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400">Last updated: July 1, 2026</p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            At DevPulse, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
          </p>
          {sections.map(({ title, content }) => (
            <div key={title} className="card p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
