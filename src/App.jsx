import React from 'react';
import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from 'lucide-react';
import { SiteFooter, SiteHeader } from './SiteChrome';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/matej-olexa',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/olexamatej',
    icon: Github,
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/metjuas',
    icon: Twitter,
  },
  {
    label: 'Email',
    href: 'mailto:olexa.matej@gmail.com',
    icon: Mail,
  },
];

const projects = [
  {
    title: 'Latium',
    description:
      'Open-source tooling for causal tracing, weight intervention, and layer-level spectral analysis of edited language models.',
    context: 'LLM security research',
    tech: ['Python', 'PyTorch', 'LLMs'],
    href: 'https://github.com/Security-FIT/Latium',
  },
  {
    title: 'BLE Monitoring System',
    description:
      'Distributed ESP32 probes and neural networks for passive, real-time BLE connection detection, reaching a 96% F1 score.',
    context: 'Bachelor\'s thesis · Grade A',
    tech: ['ESP32', 'PyTorch', 'C'],
    href: 'https://github.com/olexamatej/monitoring-bluetooth-low-energy',
  },
  {
    title: 'Multi-Agent Content Platform',
    description:
      'Four specialized AI agents with web research, location verification, and automated platform-ready content generation.',
    context: 'BSEC 2026 · 1st place',
    tech: ['TypeScript', 'Agents', 'Web search'],
    href: 'https://github.com/olexamatej/bsec-2026',
  },
  {
    title: 'Real-Time Energy Market',
    description:
      'A high-throughput Go backend for real-time energy trading, built in a four-person hackathon team.',
    context: 'Second Foundation · 2nd place',
    tech: ['Go', 'Concurrency'],
    href: 'https://github.com/olexamatej/second-foundation',
  },
];

const experience = [
  {
    period: '09.2025 — now',
    role: 'LLM Security Researcher',
    company: 'Security@FIT · Red Hat Research',
    description:
      'Detecting ROME and MEMIT knowledge edits in language models. Built Latium; research submitted to ACM CCS.',
    tags: ['LLM forensics', 'PyTorch', 'Research'],
  },
  {
    period: '04.2025 — 12.2025',
    role: 'Security & Software Developer',
    company: 'Guardians.cz',
    description:
      'Built and deployed a full-stack NIS2 compliance automation system and consulted on DevSecOps and CI/CD security.',
    tags: ['NIS2', 'Python', 'SvelteKit'],
  },
  {
    period: '09.2023 — 08.2025',
    role: 'BLE Security Researcher',
    company: 'Security@FIT',
    description:
      'Built distributed ESP32 monitoring probes and neural BLE connection detectors with a 96% F1 score.',
    tags: ['BLE', 'Embedded systems', 'Machine learning'],
  },
];

const speaking = [
  { name: 'SantaCrypt', type: 'Security conference' },
  { name: 'Brno AI Meetup', type: 'AI meetup' },
  { name: 'DevConf.cz', type: 'Developer conference' },
];

const hackathons = [
  { name: 'BSEC 2025', result: 'Winner' },
  { name: 'BSEC 2026', result: 'Winner' },
  { name: 'Second Foundation', result: '2nd place' },
  { name: 'Codex Hackathon · Vienna', result: '9th / 80 teams' },
];

function App() {
  return (
    <div className="portfolio">
      <SiteHeader active="overview" />

      <main>
        <section className="page-shell hero-section" id="overview">
          <div className="hero-copy">
            <div className="availability-pill">
              <span>Computer science</span>
              <span>Brno, Czechia</span>
            </div>

            <h1>
              Matej Olexa
              <span>Student researcher.</span>
            </h1>

            <p className="hero-lede">
              Currently detecting fact editing in LLMs. I like learning new stuff.
            </p>

            <div className="hero-connect">
              <span className="hero-connect-label">Connect with me</span>
              <div className="hero-socials" aria-label="Contact and social links">
                {socialLinks.map(({ label, href, icon: Icon }) => {
                  const external = href.startsWith('http');

                  return (
                    <a
                      key={label}
                      className="hero-social-link"
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                    >
                      <Icon size={17} />
                      <span>{label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          <CurrentPanel />
        </section>

        <section className="section page-shell" id="experience">
          <SectionHeading
            eyebrow="01 / Experience"
            title="Experience."
          />

          <div className="experience-layout">
            <aside className="experience-aside">
              <span className="card-kicker">Education</span>
              <h3>Final year of my master&apos;s</h3>
              <p>
                MSc in AI &amp; Cybersecurity · expected 2027<br />
                BSc in Information Technology · 2025
              </p>
              <a href="https://www.fit.vut.cz/" target="_blank" rel="noreferrer">
                Faculty of IT <ArrowUpRight size={16} />
              </a>
            </aside>

            <div className="timeline">
              {experience.map((item) => (
                <ExperienceItem key={`${item.role}-${item.period}`} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section-rule page-shell" id="elsewhere">
          <SectionHeading
            eyebrow="02 / Elsewhere"
            title="Talks and hackathons."
          />

          <div className="activity-layout">
            <ActivityList title="Spoke at" items={speaking} valueKey="type" />
            <ActivityList title="Hackathon results" items={hackathons} valueKey="result" />
          </div>

          <div className="overview-writing" aria-label="Featured writing">
            <span>Featured writing</span>
            <a href="/blogs/contractor.html">
              <FileText size={15} />
              <span><strong>Contractor</strong>Stack canary bypass</span>
              <ArrowUpRight size={14} />
            </a>
            <a href="/blogs/strategist.html">
              <FileText size={15} />
              <span><strong>Strategist</strong>Tcache poisoning</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        <section className="section section-rule page-shell" id="work">
          <SectionHeading
            eyebrow="03 / Work"
            title="Selected work."
            description="Open-source research and competition projects."
          />

          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} index={index + 1} {...project} />
            ))}
          </div>

          <div className="section-links">
            <a className="inline-link" href="/index-projects.html">
              All projects <ArrowUpRight size={17} />
            </a>
            <a className="inline-link" href="/writeups.html">
              CTF writeups <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function CurrentPanel() {
  return (
    <aside className="current-panel" aria-label="Current work">
      <div className="current-panel-topline">
        <span className="card-kicker">Current work</span>
        <span>2025 — now</span>
      </div>

      <div className="current-panel-main">
        <span className="current-panel-id">Research / 01</span>
        <h2>LLM forensics</h2>
        <p>
          Detecting ROME and MEMIT knowledge edits in open-weight language models.
        </p>
      </div>

      <dl className="current-facts">
        <div>
          <dt>Lab</dt>
          <dd>Security@FIT</dd>
        </div>
        <div>
          <dt>Partners</dt>
          <dd>Red Hat Research</dd>
        </div>
        <div>
          <dt>Open source</dt>
          <dd>Latium</dd>
        </div>
      </dl>

      <a href="https://github.com/Security-FIT/Latium" target="_blank" rel="noreferrer">
        View Latium <ArrowUpRight size={16} />
      </a>
    </aside>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className={`section-heading ${description ? '' : 'section-heading-compact'}`}>
      <div className="section-index">
        <small>{eyebrow}</small>
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ActivityList({ title, items, valueKey }) {
  return (
    <section className="activity-group">
      <h3>{title}</h3>
      <div className="activity-list">
        {items.map((item, index) => (
          <div className="activity-item" key={item.name}>
            <span className="activity-number">{String(index + 1).padStart(2, '0')}</span>
            <strong>{item.name}</strong>
            <span className="activity-value">{item[valueKey]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ title, description, context, tech, href, index }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="project-card">
      <div className="project-topline">
        <span>{String(index).padStart(2, '0')}</span>
        <span>{context}</span>
      </div>

      <div className="project-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="project-footer">
        <div className="tag-row">
          {tech.map((item) => <span key={item}>{item}</span>)}
        </div>
        <ArrowUpRight size={20} />
      </div>
    </a>
  );
}

function ExperienceItem({ period, role, company, description, tags }) {
  return (
    <article className="experience-item">
      <div className="timeline-marker" />
      <time>{period}</time>
      <div className="experience-content">
        <h3>{role}</h3>
        <h4>{company}</h4>
        <p>{description}</p>
        <div className="tag-row">
          {tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

export default App;
