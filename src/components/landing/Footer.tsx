import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const links = {
  Product: [
    { label: 'Home', href: '/' },
    { label: 'Issues', href: '/issues' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  Support: [
    { label: 'Help Center', href: '/contact' },
    { label: 'Report a Bug', href: '/issues/create' },
    { label: 'Request Feature', href: '/issues/create' },
    { label: 'Sign Up', href: '/auth/signup' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">DevPulse</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" /><span>hello@devpulse.dev</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400" /><span>+1 (555) 000-1234</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-400" /><span>San Francisco, CA</span></div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} DevPulse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
