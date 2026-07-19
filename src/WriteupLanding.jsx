import React from 'react';
import {
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Github,
} from 'lucide-react';
import { PageIntro, SiteFooter, SiteHeader } from './SiteChrome';

const ARTICLES = [
  {
    id: 'strategist',
    title: 'The Strategist',
    description: 'Heap exploitation through an off-by-one vulnerability and tcache poisoning.',
    date: 'May 2025',
    readTime: '8 min read',
    url: '/blogs/strategist.html',
    category: 'Heap exploitation',
  },
  {
    id: 'contractor',
    title: 'The Contractor',
    description: 'Stack pointer corruption used to bypass canaries in a hardened 64-bit binary.',
    date: 'May 2025',
    readTime: '10 min read',
    url: '/blogs/contractor.html',
    category: 'Binary exploitation',
  },
];

const REPOS = [
  {
    id: 'pwnable-kr',
    name: 'pwnable.kr',
    category: 'Binary exploitation',
    description: 'Stack corruption, heap behaviour, and Linux exploitation fundamentals.',
    url: 'https://github.com/olexamatej/pwnable.kr',
    writeupCount: 13,
    level: 'Advanced',
  },
  {
    id: 'webhacking-kr',
    name: 'webhacking.kr',
    category: 'Web security',
    description: 'XSS, SQL injection, authentication bypasses, and browser-side puzzles.',
    url: 'https://github.com/olexamatej/webhacking.kr',
    writeupCount: 12,
    level: 'Intermediate',
  },
  {
    id: 'lactf2025',
    name: 'LA CTF 2025',
    category: 'Mixed challenges',
    description: 'Seven competition challenges spanning modern web and security techniques.',
    url: 'https://github.com/olexamatej/lactf2025',
    writeupCount: 7,
    level: 'Advanced',
  },
  {
    id: 'picoctf',
    name: 'picoCTF',
    category: 'Web exploitation',
    description: 'Approachable web exploitation challenges with concise, practical solutions.',
    url: 'https://github.com/olexamatej/picoctf',
    writeupCount: 16,
    level: 'Beginner',
  },
];

function RepoCard({ repo, onClick }) {
  return (
    <article className="repo-card">
      <button type="button" className="repo-card-main" onClick={onClick}>
        <div className="repo-card-topline">
          <span>Open collection</span>
          <ChevronRight size={20} />
        </div>
        <div>
          <span className="card-kicker">{repo.category}</span>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
        </div>
        <div className="repo-card-stats">
          <span><strong>{repo.writeupCount}</strong> writeups</span>
          <span>{repo.level}</span>
        </div>
      </button>
      <a href={repo.url} target="_blank" rel="noreferrer" className="repo-github">
        <Github size={15} /> Repository <ArrowUpRight size={14} />
      </a>
    </article>
  );
}

function ArticleCard({ article }) {
  return (
    <a href={article.url} className="article-card">
      <div className="article-card-icon"><FileText size={22} /></div>
      <div className="article-card-copy">
        <span className="card-kicker">{article.category}</span>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>
      <div className="article-card-meta">
        <span><Calendar size={14} /> {article.date}</span>
        <span><Clock size={14} /> {article.readTime}</span>
      </div>
      <ArrowUpRight className="article-card-arrow" size={21} />
    </a>
  );
}

export default function WriteupLanding({ onSelectRepo }) {
  return (
    <div className="portfolio inner-page selection:bg-violet-300 selection:text-violet-950">
      <div className="ambient ambient-one" aria-hidden="true" />
      <SiteHeader active="writing" />

      <main className="page-shell page-main">
        <PageIntro
          eyebrow="Writing"
          count="2 articles · 48 writeups"
          title="Articles and writeups."
          description="Exploit walkthroughs and CTF challenge solutions."
        />

        <section className="writing-group" aria-labelledby="articles-heading">
          <header className="writing-group-heading">
            <h2 id="articles-heading">Articles</h2>
            <span>{ARTICLES.length}</span>
          </header>
          <div className="article-list">
            {ARTICLES.map((article) => <ArticleCard key={article.id} article={article} />)}
          </div>
        </section>

        <section className="writing-group" aria-labelledby="writeups-heading">
          <header className="writing-group-heading">
            <h2 id="writeups-heading">CTF collections</h2>
            <span>48 writeups</span>
          </header>
          <div className="repo-grid" aria-label="Writeup collections">
            {REPOS.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onClick={() => onSelectRepo(repo.id)}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
