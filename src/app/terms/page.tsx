import PublicNavbar from "@/components/landing/PublicNavbar";
import Footer from "@/components/landing/Footer";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using Bugify, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you may not use our platform.",
  },
  {
    title: "User Accounts",
    content:
      "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account. You must be at least 13 years old to use Bugify.",
  },
  {
    title: "Acceptable Use",
    content:
      "You agree not to use Bugify to upload malicious content, attempt to reverse-engineer the platform, impersonate other users, or use the API to scrape data at a rate that disrupts service for other users. We reserve the right to suspend accounts that violate these terms.",
  },
  {
    title: "Intellectual Property",
    content:
      "Bugify is open source software licensed under the MIT License. The Bugify name, logo, and brand assets are protected trademarks. Content you submit (issue titles, descriptions) remains your own intellectual property.",
  },
  {
    title: "Service Availability",
    content:
      "We strive for 99.9% uptime but do not guarantee uninterrupted access. We may perform maintenance with or without prior notice. Bugify is not liable for losses caused by service interruptions.",
  },
  {
    title: "Limitation of Liability",
    content:
      'Bugify is provided "as is" without warranties of any kind. To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the platform.',
  },
  {
    title: "Termination",
    content:
      "Either party may terminate the relationship at any time. You may delete your account from the profile settings. We may suspend or terminate accounts that violate these terms. Upon termination, your right to use the platform ceases immediately.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco County, California.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PublicNavbar />
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-6 shadow-lg">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Last updated: July 1, 2026
          </p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Please read these Terms of Service carefully before using Bugify.
            These terms govern your access to and use of the Bugify platform,
            API, and related services.
          </p>
          {sections.map(({ title, content }) => (
            <div key={title} className="card p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {content}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
