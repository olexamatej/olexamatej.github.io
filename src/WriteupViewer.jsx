import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { CHALLENGE_DIRECTORY_MAP } from './writeup-mappings';

const REPOS = [
  {
    id: 'picoctf',
    name: 'picoCTF',
    color: '#10b981',
    writeups: [
      { id: 'picoctf-caas', title: 'CaaS' },
      { id: 'picoctf-client-side-again', title: 'Client Side Again' },
      { id: 'picoctf-forbidden-paths', title: 'Forbidden Paths' },
      { id: 'picoctf-findme', title: 'Findme' },
      { id: 'picoctf-irish-name-repo-1', title: 'Irish Name Repo 1' },
      { id: 'picoctf-irish-name-repo-3', title: 'Irish Name Repo 3' },
      { id: 'picoctf-it-is-my-birthday', title: 'It Is My Birthday' },
      { id: 'picoctf-login', title: 'Login' },
      { id: 'picoctf-more-sqli', title: 'More SQLi' },
      { id: 'picoctf-picobrowser', title: 'Picobrowser' },
      { id: 'picoctf-power-cookie', title: 'Power Cookie' },
      { id: 'picoctf-search-source', title: 'Search Source' },
      { id: 'picoctf-secrets', title: 'Secrets' },
      { id: 'picoctf-soap', title: 'SOAP' },
      { id: 'picoctf-sqlilite', title: 'SQLiLite' },
      { id: 'picoctf-trickster', title: 'Trickster' }
    ]
  },
  {
    id: 'webhacking-kr',
    name: 'webhacking.kr',
    color: '#f59e0b',
    writeups: [
      { id: 'webhacking-kr-old-01', title: 'Challenge 01' },
      { id: 'webhacking-kr-old-02', title: 'Challenge 02' },
      { id: 'webhacking-kr-old-03', title: 'Challenge 03' },
      { id: 'webhacking-kr-old-05', title: 'Challenge 05' },
      { id: 'webhacking-kr-old-06', title: 'Challenge 06' },
      { id: 'webhacking-kr-old-07', title: 'Challenge 07' },
      { id: 'webhacking-kr-old-08', title: 'Challenge 08' },
      { id: 'webhacking-kr-old-11', title: 'Challenge 11' },
      { id: 'webhacking-kr-old-14', title: 'Challenge 14' },
      { id: 'webhacking-kr-old-17', title: 'Challenge 17' },
      { id: 'webhacking-kr-old-18', title: 'Challenge 18' },
      { id: 'webhacking-kr-old-19', title: 'Challenge 19' }
    ]
  },
  {
    id: 'lactf2025',
    name: 'LA CTF 2025',
    color: '#ef4444',
    writeups: [
      { id: 'lactf2025-2password', title: '2password' },
      { id: 'lactf2025-cache-it-to-win-it', title: 'Cache It To Win It' },
      { id: 'lactf2025-extremely-convenient-breaker', title: 'Extremely Convenient Breaker' },
      { id: 'lactf2025-ispy', title: 'iSpy' },
      { id: 'lactf2025-mavs-fan', title: 'Mavs Fan' },
      { id: 'lactf2025-purell', title: 'Purell' },
      { id: 'lactf2025-state-change', title: 'State Change' }
    ]
  },
  {
    id: 'pwnable-kr',
    name: 'pwnable.kr',
    color: '#ef4444',
    writeups: [
      { id: 'pwnable-kr-blackjack', title: 'Blackjack' },
      { id: 'pwnable-kr-bof', title: 'BOF' },
      { id: 'pwnable-kr-cmd', title: 'CMD' },
      { id: 'pwnable-kr-coin1', title: 'Coin1' },
      { id: 'pwnable-kr-collision', title: 'Collision' },
      { id: 'pwnable-kr-fd', title: 'FD' },
      { id: 'pwnable-kr-input2', title: 'Input2' },
      { id: 'pwnable-kr-lotto', title: 'Lotto' },
      { id: 'pwnable-kr-mistake', title: 'Mistake' },
      { id: 'pwnable-kr-passcode', title: 'Passcode' },
      { id: 'pwnable-kr-random', title: 'Random' },
      { id: 'pwnable-kr-shellshock', title: 'Shellshock' },
      { id: 'pwnable-kr-uaf', title: 'UAF' }
    ]
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

function WriteupContent({ writeupId }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!writeupId) return;
    
    setLoading(true);
    setError(null);
    
    fetch(`/blogs/_includes/${writeupId}.md`)
      .then(res => {
        if (!res.ok) throw new Error('Writeup not found');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [writeupId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400">Loading writeup...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-red-400">
        Error: {error}
      </div>
    );
  }

  // Transform image URLs to use GitHub raw URLs
  const transformImageUrl = (url) => {
    if (url.startsWith('http')) return url;
    
    // Get the actual GitHub directory name from the mapping
    const actualDirName = CHALLENGE_DIRECTORY_MAP[writeupId];
    if (!actualDirName) {
      console.warn(`No directory mapping found for ${writeupId}`);
      return url;
    }
    
    // Extract repo name from writeupId
    const repoName = writeupId.split('-')[0];
    const repoOwner = 'olexamatej';
    
    // Remove leading ./ or /
    const cleanPath = url.replace(/^\.?\//, '');
    
    // Use master branch and actual directory name
    return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/${actualDirName}/${cleanPath}`;
  };

  return (
    <div className="prose prose-invert prose-slate max-w-none">
      <ReactMarkdown
        components={{
          img: ({node, ...props}) => (
            <img 
              {...props} 
              src={transformImageUrl(props.src)} 
              alt={props.alt || 'Image'}
              className="rounded-lg"
            />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default function WriteupViewer({ selectedRepo, onBack }) {
  const [selectedWriteup, setSelectedWriteup] = useState(null);

  // Filter repos based on selection
  const filteredRepos = selectedRepo 
    ? REPOS.filter(r => r.id === selectedRepo)
    : REPOS;

  // Set first writeup as default when repo is selected
  useEffect(() => {
    if (selectedRepo && !selectedWriteup) {
      const repo = REPOS.find(r => r.id === selectedRepo);
      if (repo && repo.writeups.length > 0) {
        setSelectedWriteup(repo.writeups[0].id);
      }
    }
  }, [selectedRepo, selectedWriteup]);

  // Get current writeup info
  const currentRepo = REPOS.find(r => 
    r.writeups.some(w => w.id === selectedWriteup)
  );
  const currentWriteup = currentRepo?.writeups.find(w => w.id === selectedWriteup);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Navigation */}
        <nav className="mb-12 flex gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/index-blogs.html">Blog</NavLink>
          <NavLink href="/writeups.html">CTF Writeups</NavLink>
        </nav>

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to categories
        </button>

        {/* Category Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> 
            {currentRepo?.name || 'Select Writeup'}
          </h2>
        </div>

        {/* Writeup Navigation */}
        {filteredRepos.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredRepos.flatMap(repo => 
                repo.writeups.map(writeup => (
                  <button
                    key={writeup.id}
                    onClick={() => setSelectedWriteup(writeup.id)}
                    className={`
                      text-left px-3 py-2 rounded text-sm transition-colors
                      ${
                        selectedWriteup === writeup.id
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50'
                          : 'bg-slate-900/50 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                      }
                    `}
                  >
                    {writeup.title}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Content */}
        {currentWriteup ? (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">
              {currentWriteup.title}
            </h1>
            <WriteupContent writeupId={selectedWriteup} />
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            Select a writeup to view
          </div>
        )}
      </div>
    </div>
  );
}
