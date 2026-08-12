'use client';
import PublicNavbar from '@/components/landing/PublicNavbar';
import Footer from '@/components/landing/Footer';
import { Zap, Target, Heart, Users, Code2, Shield, Rocket, Award } from 'lucide-react';

const team = [
  { name: 'Alex Rivera', role: 'Founder & CEO', bio: 'Former engineer at GitHub. Passionate about developer tooling and open source.', initials: 'AR', color: 'from-indigo-400 to-purple-500' },
  { name: 'Sarah Kim', role: 'Lead Engineer', bio: 'Full-stack developer with 8 years building scalable systems at Stripe and Shopify.', initials: 'SK', color: 'from-pink-400 to-rose-500' },
  { name: 'Marcus Chen', role: 'Product Designer', bio: 'UX designer focused on developer experience. Previously at Figma and Linear.', initials: 'MC', color: 'from-amber-400 to-orange-500' },
  { name: 'Priya Patel', role: 'Backend Engineer', bio: 'PostgreSQL expert and API architect. Open source contributor for 6+ years.', initials: 'PP', color: 'from-emerald-400 to-teal-500' },
];

const values = [
  { icon: Code2, title: 'Developer First', desc: 'Every decision is made with developers in mind. Clean APIs, clear docs, no bloat.', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
  { icon: Heart, title: 'Open Source', desc: 'We believe great tooling should be accessible to everyone. DevPulse is open source at its core.', color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20' },
  { icon: Shield, title: 'Security by Default', desc: 'JWT auth, bcrypt hashing, and role enforcement baked in from day one — not bolted on later.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: Users, title: 'Team Collaboration', desc: 'Built for teams of all sizes. Whether 2 people or 200, DevPulse scales with you.', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
  { icon: Target, title: 'Focus on Outcomes', desc: 'We care about resolved issues, not tracked ones. Our workflow is designed to drive closure.', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
  { icon: Rocket, title: 'Continuous Improvement', desc: 'We ship fast, listen to feedback, and iterate constantly. DevPulse is always getting better.', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
];

const milestones = [
  { year: '2024', title: 'DevPulse Founded', desc: 'Started as an internal tool for a small dev team tired of messy issue tracking.' },
  { year: '2024', title: 'Open Sourced', desc: 'Released the core codebase publicly. 500 GitHub stars in the first week.' },
  { year: '2025', title: '100 Teams Onboard', desc: 'Reached our first milestone of 100 active development teams worldwide.' },
  { year: '2026', title: '500+ Teams & Growing', desc: 'Now powering issue tracking for 500+ teams across 40+ countries.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-6">
            <Zap className="w-3.5 h-3.5" /> Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
            Built by developers,{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              for developers
            </span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            DevPulse was born out of frustration with bloated, complex issue trackers. We wanted something simple, fast, and built for how dev teams actually work.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-5">
                Make issue tracking invisible so teams can focus on building
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Great software teams don't think about their tools — they think about their product. DevPulse is designed to get out of the way while keeping everything organized.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                With a clean role-based workflow, a minimal API, and a dashboard that actually shows useful information, DevPulse helps teams spend more time shipping and less time administering.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: '500+', sub: 'Dev Teams' },
                { icon: Code2, label: '10K+', sub: 'Issues Resolved' },
                { icon: Users, label: '2K+', sub: 'Active Users' },
                { icon: Rocket, label: '99.9%', sub: 'Uptime' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={sub} className="card p-5 text-center">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">What We Believe</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our core values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Journey</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-8">
              {milestones.map(({ year, title, desc }, i) => (
                <div key={i} className="relative flex gap-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg shadow-indigo-200 dark:shadow-indigo-900 z-10">
                    {year}
                  </div>
                  <div className="card p-5 flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">The Team</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Meet the people behind DevPulse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, bio, initials, color }) => (
              <div key={name} className="card p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-4 shadow-md`}>
                  {initials}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{name}</h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 mb-3">{role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
