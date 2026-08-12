'use client';
import Link from 'next/link';
import PublicNavbar from '@/components/landing/PublicNavbar';
import Footer from '@/components/landing/Footer';
import { Zap, Bug, Sparkles, Shield, Users, BarChart3, CheckCircle, ArrowRight, Star, ChevronDown, MessageSquare, Rocket, Lock } from 'lucide-react';
import { useState } from 'react';

const features = [
  { icon: Bug, title: 'Bug Tracking', desc: 'Report and track bugs with detailed descriptions, reproduction steps, and status updates.', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
  { icon: Sparkles, title: 'Feature Requests', desc: 'Suggest and vote on new features. Keep your product roadmap aligned with user needs.', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Contributors submit issues. Maintainers manage, resolve, and control the full workflow.', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Visual charts and stats that give your team instant clarity on project health.', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  { icon: Users, title: 'Team Collaboration', desc: 'Built for teams. Everyone stays on the same page with shared visibility.', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: Lock, title: 'Secure by Default', desc: 'JWT authentication, bcrypt password hashing, and role enforcement on every endpoint.', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
];

const stats = [
  { value: '10K+', label: 'Issues Tracked' },
  { value: '500+', label: 'Dev Teams' },
  { value: '99.9%', label: 'Uptime' },
  { value: '3x', label: 'Faster Resolution' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Engineering Lead, Stripe', text: 'DevPulse transformed how our team handles bugs. The role-based workflow means nothing slips through the cracks.', rating: 5 },
  { name: 'Marcus Ali', role: 'CTO, Vercel Labs', text: 'Clean UI, fast API, and the dashboard charts give me exactly the visibility I need every morning.', rating: 5 },
  { name: 'Priya Sharma', role: 'Product Manager, Linear', text: 'Our resolution time dropped by 40% in the first month. The feature request workflow is incredibly intuitive.', rating: 5 },
];

const faqs = [
  { q: 'How does role-based access work?', a: 'Contributors can create and manage their own issues. Maintainers have full control — they can update any issue, change its status, and delete issues. Roles are assigned at registration.' },
  { q: 'Is there a free plan?', a: 'Yes! DevPulse is open source. You can self-host it for free or use our hosted version with generous limits for small teams.' },
  { q: 'How is the JWT token used?', a: 'After login, you receive a token that must be attached to the Authorization header on all protected API requests. No Bearer prefix required — just the raw token.' },
  { q: 'Can I integrate DevPulse with other tools?', a: 'The REST API is fully documented and accessible, making it straightforward to integrate with GitHub, Slack, or any other tools your team uses.' },
  { q: 'What happens when I change an issue status?', a: 'Status changes are maintainer-only. Options are: open → in_progress → resolved. Each change timestamps updated_at automatically.' },
];

const steps = [
  { step: '01', title: 'Sign Up', desc: 'Create your account and choose your role — contributor or maintainer.' },
  { step: '02', title: 'Report Issues', desc: 'Submit detailed bug reports or feature requests with type and description.' },
  { step: '03', title: 'Track & Resolve', desc: 'Maintainers triage, update status, and drive issues to resolution.' },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PublicNavbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        {/* Floating blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-8">
            <Zap className="w-3.5 h-3.5" /> Open Source Issue Tracker
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Track bugs.{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ship faster.
            </span>
          </h1>

          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            DevPulse helps software teams report issues, request features, and drive them to resolution — with a clean role-based workflow built for modern dev teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-primary btn-lg group">
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/issues" className="btn-secondary btn-lg">
              Browse Issues
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-400 flex-wrap">
            {['No credit card required', 'Open source', 'Deploy in minutes'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">{value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Everything your team needs</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Built with a focus on simplicity and power, so teams can focus on shipping rather than managing tools.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Up and running in minutes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Loved by dev teams</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }) => (
              <div key={name} className="card p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
                    <p className="text-xs text-slate-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Common questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className="font-semibold text-slate-900 dark:text-white text-sm">{q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-2xl mx-auto text-center">
          <MessageSquare className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Stay in the loop</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Get product updates, team tips, and release notes in your inbox. No spam.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@company.com" className="input flex-1" required />
            <button type="submit" className="btn-primary flex-shrink-0">Subscribe</button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Rocket className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to ship faster?</h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">Join hundreds of dev teams already using DevPulse to track and resolve issues faster than ever.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">
              Start for Free
            </Link>
            <Link href="/about" className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
