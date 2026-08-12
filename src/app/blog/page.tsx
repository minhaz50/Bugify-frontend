'use client';
import Link from 'next/link';
import PublicNavbar from '@/components/landing/PublicNavbar';
import Footer from '@/components/landing/Footer';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Why We Ditched ORMs for Raw SQL in DevPulse',
    excerpt: 'We made the controversial decision to use raw SQL queries with pg driver instead of Prisma or TypeORM. Here\'s why it was the right call and what we learned.',
    category: 'Engineering',
    date: '2026-07-15',
    readTime: '8 min read',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    initials: 'AR',
    author: 'Alex Rivera',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    id: 2,
    title: 'Role-Based Access Control: How We Designed the Contributor / Maintainer System',
    excerpt: 'Building a simple but powerful permission system with JWT tokens and middleware. Lessons from designing DevPulse\'s auth layer.',
    category: 'Product',
    date: '2026-06-28',
    readTime: '6 min read',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    initials: 'SK',
    author: 'Sarah Kim',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    id: 3,
    title: 'From 0 to 500 Teams: What We Learned About Developer Onboarding',
    excerpt: 'Growing a developer tool requires thinking differently about onboarding. Here are the 5 lessons that made the biggest difference for DevPulse\'s growth.',
    category: 'Growth',
    date: '2026-06-10',
    readTime: '5 min read',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    initials: 'PP',
    author: 'Priya Patel',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 4,
    title: 'Building a Dark Mode System with Tailwind CSS and Next.js',
    excerpt: 'Dark mode is more than just swapping colors. Here\'s how we built a proper theming system with CSS variables, class strategy, and zero flash.',
    category: 'Engineering',
    date: '2026-05-22',
    readTime: '10 min read',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    initials: 'MC',
    author: 'Marcus Chen',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 5,
    title: 'The Case for Minimal Issue Trackers in Modern Dev Teams',
    excerpt: 'Feature bloat kills productivity. We explored why many teams are moving away from Jira-style trackers toward simpler tools — and what that means for the future.',
    category: 'Opinion',
    date: '2026-05-05',
    readTime: '7 min read',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    initials: 'AR',
    author: 'Alex Rivera',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    id: 6,
    title: 'Deploying Full-Stack TypeScript on Vercel: A Production Checklist',
    excerpt: 'CORS, environment variables, connection pooling, and cold starts — everything you need to check before shipping your Node.js + Next.js app to production.',
    category: 'DevOps',
    date: '2026-04-18',
    readTime: '12 min read',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    initials: 'SK',
    author: 'Sarah Kim',
    gradient: 'from-pink-400 to-rose-500',
  },
];

const categories = ['All', 'Engineering', 'Product', 'Growth', 'Opinion', 'DevOps'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Stories from the DevPulse team
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Engineering deep-dives, product decisions, and lessons learned building developer tooling.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat}
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <div className="card overflow-hidden mb-8 hover:shadow-lg transition-shadow group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl font-extrabold opacity-20 mb-2">01</div>
                  <p className="text-lg font-bold">Featured Article</p>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400"><Tag className="w-3 h-3" />{posts[0].category}</span>
                  <span className="text-xs text-slate-400">Featured</span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {posts[0].title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{posts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${posts[0].gradient} flex items-center justify-center text-white text-xs font-bold`}>
                      {posts[0].initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">{posts[0].author}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" />{new Date(posts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <Clock className="w-3 h-3 ml-1" />{posts[0].readTime}
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">
                <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                  <span className="text-5xl font-extrabold text-white/20">0{post.id}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`badge ${post.color}`}><Tag className="w-3 h-3" />{post.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-sm leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                        {post.initials}
                      </div>
                      <span className="text-xs text-slate-500">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />{post.readTime}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
