import React from 'react';
import { BookOpen, ChevronRight, Github } from 'lucide-react';

const REPOS = [
  {
    id: 'pwnable-kr',
    name: 'pwnable.kr',
    category: 'Binary Exploitation',
    description: 'Binary exploitation and pwn challenges - one of my all time favs!',
    url: 'https://github.com/olexamatej/pwnable.kr',
    color: '#ef4444',
    writeupCount: 13
  },
  {
    id: 'webhacking-kr',
    name: 'webhacking.kr',
    category: 'Web Security',
    description: 'Web security challenges covering XSS, SQL injection, and more',
    url: 'https://github.com/olexamatej/webhacking.kr',
    color: '#f59e0b',
    writeupCount: 12
  },
  {
    id: 'lactf2025',
    name: 'LA CTF 2025',
    category: 'Mixed Challenges',
    description: 'Advanced CTF challenges from LA CTF 2025 competition',
    url: 'https://github.com/olexamatej/lactf2025',
    color: '#ef4444',
    writeupCount: 7
  },
  {
    id: 'picoctf',
    name: 'picoCTF',
    category: 'Web Exploitation',
    description: 'Web exploitation challenges from picoCTF',
    url: 'https://github.com/olexamatej/picoctf',
    color: '#10b981',
    writeupCount: 16
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

function RepoCard({ repo, onClick }) {
  return (
    <div 
      className="p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-slate-200 mb-1">{repo.name}</h3>
          <div className="text-slate-500 text-xs mb-2">{repo.category}</div>
        </div>
        <div className="text-slate-500 text-xs">{repo.writeupCount} writeups</div>
      </div>
      
      <p className="text-slate-400 text-sm mb-3">
        {repo.description}
      </p>
      
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 hover:underline text-xs font-medium flex items-center gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Github className="w-3 h-3" />
        View on GitHub
      </a>
    </div>
  );
}

export default function WriteupLanding({ onSelectRepo }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Navigation */}
        <nav className="mb-12 flex gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/index-blogs.html">Blog</NavLink>
          <NavLink href="/writeups.html">CTF Writeups</NavLink>
          <NavLink href="/index-projects.html">Projects</NavLink>
        </nav>

        {/* Content */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> CTF Writeups
          </h2>
          <p className="text-slate-400 mb-8">
            Check out different CTFs!
          </p>
        </div>

        {/* Cyberapocalypse Featured */}
        <div className="mb-8">
          <a
            href="/index-blogs.html"
            className="block p-4 rounded-lg border-2 border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-medium text-purple-300">Cyber Apocalypse</h3>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                Featured
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Much more in-depth blog-style writeups covering advanced exploitation techniques, detailed methodology, and comprehensive analysis.
            </p>
          </a>
        </div>

        {/* Repository List */}
        <div className="space-y-4">
          {REPOS.map(repo => (
            <RepoCard 
              key={repo.id} 
              repo={repo} 
              onClick={() => onSelectRepo(repo.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
