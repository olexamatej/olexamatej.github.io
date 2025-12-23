import React from 'react';
import { Github, Linkedin, Mail, Terminal, Cpu, Shield, ExternalLink, FileText, Trophy, Code } from 'lucide-react';

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

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Navigation */}
        <nav className="mb-12 flex gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/index-blogs.html">Blog</NavLink>
          <NavLink href="/writeups.html">CTF Writeups</NavLink>
          <NavLink href="/index-projects.html">Projects</NavLink>
        </nav>
        
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Matej Olexa</h1>
          <div className="flex flex-wrap gap-4 text-slate-400 mb-8 font-mono text-sm">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Security Researcher @ Security@FIT
            </span>
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Master's Student @ BUT
            </span>
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Ex-Security Developer @ Guardians.cz
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-xl">
            Cybersecurity Master's Student at FIT BUT and Researcher with SECURITY@FIT. 
            My research currently focuses on <strong>LLM model integrity</strong> and adversarial robustness, building upon my previous work in BLE security and embedded systems. 
            Previously a Security & Software Developer at Guardians.cz, where I architected NIS2 compliance automation tools. 
            Passionate about malware analysis, reverse engineering, and high-performance systems.
          </p>
          
          <div className="flex gap-4 mt-6">
            <SocialLink href="https://github.com/olexamatej" icon={<Github className="w-5 h-5" />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/matej-olexa" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
            <SocialLink href="mailto:olexa.matej@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" />
            <SocialLink href="/writeups.html" icon={<Terminal className="w-5 h-5" />} label="CTF Writeups" />
            <SocialLink href="/index-projects.html" icon={<Code className="w-5 h-5" />} label="Projects" />
          </div>
        </header>

        {/* Professional Experience */}
        <section className="mb-16 p-6 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">
              Professional Experience
            </h2>
          </div>
          <div className="space-y-8">
            <ExperienceItem 
              title="LLM Security Researcher" 
              company="Security@FIT (RedHat/IBM Sponsored)" 
              period="Sept 2025 - Present"
              description="Developing novel detection methods for fact-editing techniques in large language models under PhD supervision. Research focuses on model integrity, adversarial robustness, and identifying knowledge manipulation patterns."
              current={true}
            />
            <ExperienceItem 
              title="Security & Software Developer" 
              company="Guardians.cz" 
              period="April 2025 – Dec 2025"
              description="Architected and developed a full-stack NIS2 (nZKB) compliance automation engine (Python/SvelteKit, 13k LOC). Conducted real-world penetration testing and consulted on SSDLC implementation and CI/CD security integration."
            />
            <ExperienceItem 
              title="BLE Security Researcher" 
              company="Security@FIT" 
              period="Sept 2023 - Aug 2025"
              description={
                <>
                  Designed neural network architectures (MLPs/CNNs) for real-time BLE connection detection (96% F1-score). Co-engineered multi-sniffer monitoring probes using ESP32. Awarded at <span className="text-slate-200 font-medium">EXCEL@FIT 2025</span> and presented at <span className="text-slate-200 font-medium">MKB 2025</span>.
                </>
              }
              award={true}
            />
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="text-emerald-400">#</span> Projects
            </h2>
            <a
              href="/index-projects.html"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              View All
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="grid gap-4">
            <ProjectCard 
              title="2D Mobile Robot Simulator" 
              tech="C++ / Qt"
              description="Physics-based simulator for autonomous mobile robots with collision detection and real-time visualization. Implemented autonomous navigation and remote operation modes."
              link="https://github.com/olexamatej/robot-simulation"
            />
            <ProjectCard 
              title="Real-Time Energy Trading Market" 
              tech="Go"
              description="High-performance backend for real-time energy trading (2nd Place at Second Foundation Hackathon). Optimized for low-latency order matching and high concurrency."
              link="https://github.com/olexamatej/second-foundation"
            />
            <ProjectCard 
              title="Multi-Threaded Chat Client" 
              tech="C++ / TCP / UDP"
              description="Custom protocol client supporting TCP/UDP. Designed multi-threaded architecture with a custom reliability layer for UDP packet tracking and acknowledgments."
              link="https://github.com/olexamatej/ipk-chat-client"
            />
            <ProjectCard 
              title="BSEC2025 Hackathon Winner" 
              tech="Next.js / Tailwind"
              description="Winning gamified personal finance management application. Combined financial tracking with game mechanics to encourage healthy money habits."
              link="https://github.com/olexamatej/bsec-2025"
            />
          </div>
        </section>

        {/* CTF & Competitions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> Security Competitions
          </h2>
          
          <div className="space-y-6">
            {/* CyberHeroes */}
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10">
                 <Trophy className="w-16 h-16 text-emerald-400" />
               </div>
               <h3 className="text-lg font-medium text-emerald-400 mb-1">CyberHeroes Academy (Blue Team)</h3>
               <div className="text-emerald-500/80 text-sm mb-3">Binary Confidence, 2025</div>
               <p className="text-slate-300 text-sm leading-relaxed">
                 Led SOC analyst role in a 7-person team. <strong>First team in history</strong> to successfully defend against red team attacks, achieving a record-breaking point score during real-time defensive operations.
               </p>
            </div>

            {/* CyberApocalypse */}
            <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
              <h3 className="text-lg font-medium text-slate-200 mb-2">CyberApocalypse CTF 2025</h3>
              <div className="flex gap-4 text-sm font-mono text-slate-400 mb-3">
                <span>Rank: 166th / 8130</span>
                <span className="text-emerald-500">•</span>
                <span>Team MVP</span>
              </div>
              <p className="text-slate-400 text-sm">
                Key contributor for binary exploitation challenges. Authored writeups for <a href="/blogs/contractor.html" className="text-emerald-400 hover:underline">Contractor</a> & <a href="/blogs/strategist.html" className="text-emerald-400 hover:underline">Strategist</a>.
              </p>
            </div>

            {/* CTF Writeups Card */}
            <div className="grid gap-4">
              <a 
                href="/writeups.html"
                className="block p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-slate-200 mb-2 group-hover:text-emerald-400 transition-colors">CTF Challenge Writeups</h3>
                    <p className="text-slate-400 text-sm mb-3">
                      Collection of writeups from picoCTF, pwnable.kr, webhacking.kr, LACTF 2025, and more.
                    </p>
                    <div className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                      <span>Browse all writeups</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> Certifications
          </h2>
          <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium text-slate-200">nZKB Akademia Certificate</h3>
              <span className="text-sm text-slate-500 font-mono">2025</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">Specialized training in new Czech cybersecurity legislation (NIS2).</p>
          </div>
        </section>

        {/* Writeups */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> Selected Writeups
          </h2>
          <div className="space-y-4">
            <WriteupLink 
              title="Cyber Apocalypse 2025: Contractor"
              category="Pwn / Stack Exploitation"
              link="/blogs/contractor.html"
            />
            <WriteupLink 
              title="Cyber Apocalypse 2025: Strategist"
              category="Pwn / Heap Exploitation"
              link="/blogs/strategist.html"
            />
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Matej Olexa. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-md transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function ExperienceItem({ title, company, period, description, current, award }) {
  return (
    <div className="group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          {current && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Current
            </span>
          )}
          {award && (
            <span className="text-yellow-400 text-sm">🏆</span>
          )}
        </div>
        <span className="text-sm text-slate-500 font-mono whitespace-nowrap ml-4">{period}</span>
      </div>
      <div className="text-emerald-500/80 text-sm font-medium mb-2">{company}</div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ProjectCard({ title, description, link, tech }) {
  return (
    <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-all group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-slate-200">{title}</h3>
          {tech && <span className="text-xs font-mono text-emerald-500/70">{tech}</span>}
        </div>
      </div>
      <p className="text-slate-400 text-sm mt-1 mb-3">{description}</p>
      <div className="flex gap-3 text-sm">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
      </div>
    </div>
  );
}

function WriteupLink({ title, category, link }) {
  return (
    <a 
      href={link}
      className="flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-slate-900 transition-colors group"
    >
      <div className="p-2 rounded bg-slate-900 text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
        <FileText className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-slate-200 font-medium group-hover:text-emerald-400 transition-colors">{title}</h3>
        <p className="text-slate-500 text-xs font-mono mt-0.5">{category}</p>
      </div>
    </a>
  );
}

export default App;