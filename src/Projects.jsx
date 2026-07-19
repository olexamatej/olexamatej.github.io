import React, { useState } from 'react';
import { ArrowUpRight, FileText, Filter, Github } from 'lucide-react';
import projectsConfig from '../projects-config.json';
import { PageIntro, SiteFooter, SiteHeader } from './SiteChrome';

function ProjectCard({ project }) {
  return (
    <a
      className={`archive-card ${project.isThesis ? 'archive-card-featured' : ''}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="archive-card-top">
        <span>{project.isThesis ? 'Research project' : 'Project'}</span>
        <ArrowUpRight size={20} />
      </div>

      <div className="archive-title-row">
        <div>
          {project.isThesis && <span className="featured-label">Featured research</span>}
          <h2>{project.displayName}</h2>
        </div>
      </div>

      <p>{project.description}</p>

      <div className="archive-categories">
        {project.categories.map((category) => <span key={category}>{category}</span>)}
      </div>

      <div className="archive-tech">
        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
    </a>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = selectedCategory === 'all'
    ? projectsConfig.projects
    : projectsConfig.projects.filter((project) => project.categories.includes(selectedCategory));

  return (
    <div className="portfolio inner-page selection:bg-violet-300 selection:text-violet-950">
      <div className="ambient ambient-one" aria-hidden="true" />
      <SiteHeader active="projects" />

      <main className="page-shell page-main">
        <PageIntro
          eyebrow="Projects"
          count={`${projectsConfig.projects.length} projects`}
          title="Projects."
          description="Research, university work, and hackathon builds."
          action={(
            <div className="page-action-links">
              <a className="button button-secondary" href="/writeups.html">
                <FileText size={18} /> CTF writeups
              </a>
              <a className="button button-secondary" href="https://github.com/olexamatej" target="_blank" rel="noreferrer">
                <Github size={18} /> GitHub
              </a>
            </div>
          )}
        />

        <section className="filter-section" aria-label="Project filters">
          <div className="filter-label"><Filter size={16} /> Filter by discipline</div>
          <div className="filter-list">
            <button
              type="button"
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All <small>{projectsConfig.projects.length}</small>
            </button>
            {Object.entries(projectsConfig.categories).map(([key, category]) => {
              const count = projectsConfig.projects.filter((project) => project.categories.includes(key)).length;
              return (
                <button
                  type="button"
                  key={key}
                  className={selectedCategory === key ? 'active' : ''}
                  onClick={() => setSelectedCategory(key)}
                >
                  {category.label} <small>{count}</small>
                </button>
              );
            })}
          </div>
        </section>

        <section className="archive-grid" aria-live="polite">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
