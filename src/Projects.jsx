import React, { useState } from 'react';
import { Github, Code, Filter } from 'lucide-react';
import projectsConfig from '../projects-config.json';

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

function ProjectCard({ project }) {
  return (
    <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{project.icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-slate-200">{project.displayName}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {project.categories.map((catKey, idx) => {
                const category = projectsConfig.categories[catKey];
                return (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded font-medium"
                    style={{ 
                      backgroundColor: `${category.color}20`,
                      color: category.color,
                      border: `1px solid ${category.color}40`
                    }}
                  >
                    {category.icon} {category.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-slate-400 mb-4 leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, idx) => (
          <span 
            key={idx}
            className="text-xs px-2 py-1 rounded bg-slate-800/50 text-slate-300 border border-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-3">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
        >
          <Github className="w-4 h-4" />
          {project.isThesis ? 'View Thesis' : 'View Repository'}
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProjects = selectedCategory === 'all' 
    ? projectsConfig.projects 
    : projectsConfig.projects.filter(p => p.categories.includes(selectedCategory));
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Navigation */}
        <nav className="mb-12 flex gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/index-blogs.html">Blog</NavLink>
          <NavLink href="/writeups.html">CTF Writeups</NavLink>
          <NavLink href="/index-projects.html">Projects</NavLink>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <span className="text-emerald-400">#</span> Projects
            </h1>
            <a
              href="https://github.com/olexamatej"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              GitHub Profile
            </a>
          </div>
          <p className="text-slate-400 text-lg">
            A collection of my projects spanning various domains from systems programming to web development.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400 font-medium">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Projects
            </button>
            {Object.entries(projectsConfig.categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === key
                    ? 'text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                style={
                  selectedCategory === key 
                    ? { backgroundColor: category.color, boxShadow: `0 10px 15px -3px ${category.color}30` }
                    : {}
                }
              >
                {category.icon} {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
