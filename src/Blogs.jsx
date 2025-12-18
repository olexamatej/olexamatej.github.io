import React from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 'strategist',
    title: 'The Strategist',
    description: 'HTB CyberApocalypse 2025 - Heap exploitation via off-by-one and Tcache poisoning',
    date: 'May 2025',
    readTime: '8 min read',
    url: '/blogs/strategist.html',
    color: '#a855f7'
  },
  {
    id: 'contractor',
    title: 'The Contractor',
    description: 'HTB CyberApocalypse 2025 - Exploiting stack pointer corruption to bypass canaries',
    date: 'May 2025',
    readTime: '10 min read',
    url: '/blogs/contractor.html',
    color: '#ec4899'
  }
];

function NavLink({ href, children }) {
  return (
    <a 
      href={href} 
      className="text-slate-300 hover:text-emerald-400 transition-colors font-semibold"
    >
      {children}
    </a>
  );
}

function BlogCard({ post }) {
  return (
    <a
      href={post.url}
      className="block p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-colors"
    >
      <h3 className="text-lg font-medium text-slate-200 mb-2">{post.title}</h3>
      <p className="text-slate-400 text-sm mb-3">
        {post.description}
      </p>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </a>
  );
}

export default function Blogs() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navigation */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <nav className="mb-12 flex gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/index-blogs.html">Blog</NavLink>
          <NavLink href="/writeups.html">CTF Writeups</NavLink>
        </nav>

        {/* Content */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> Blog Posts
          </h2>
          <p className="text-slate-400 mb-8">
            More in-depth blog posts about CTF writeups or whatever I feel like writing about.
          </p>

          {/* Blog Posts */}
          <div className="space-y-4">
            {BLOG_POSTS.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Link to CTF Writeups */}
        <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
          <h3 className="font-medium text-slate-200 mb-2">Looking for CTF Writeups?</h3>
          <p className="text-slate-400 text-sm mb-3">
            Check much shorter, simpler CTF writeups!
          </p>
          <a 
            href="/writeups.html"
            className="text-emerald-400 hover:underline text-sm font-medium"
          >
            Browse CTF Writeups →
          </a>
        </div>
      </div>
    </div>
  );
}
