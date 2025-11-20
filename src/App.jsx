import React from 'react';
import { Github, Linkedin, Mail, Terminal, Cpu, Shield, ExternalLink, FileText } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Matej Olexa</h1>
          <div className="flex flex-wrap gap-4 text-slate-400 mb-8 font-mono text-sm">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Security@FIT
            </span>
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Master's Student @ BUT
            </span>
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Low-level Security
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-xl">
            Cybersecurity Master's Student at FIT BUT and Student Researcher with SECURITY@FIT, where my work spans from Bluetooth Low Energy security to my current focus on Large Language Models. As an intern at Guardians.cz, I develop security tools and contribute to penetration tests. My personal passion lies in malware analysis, reverse engineering, and all things low-level. I'm always open to discussing new challenges in security.
          </p>
          
          <div className="flex gap-4 mt-6">
            <SocialLink href="https://github.com/olexamatej" icon={<Github className="w-5 h-5" />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/matej-olexa-0b7883222/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
            <SocialLink href="mailto:olexa.matej@gmail.com" icon={<Mail className="w-5 h-5" />} label="Email" />
          </div>
        </header>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> Experience
          </h2>
          <div className="space-y-8">
            <ExperienceItem 
              title="LLM Integrity Researcher" 
              company="Security@FIT" 
              period="Sept 2025 - Present"
              description="Beginning research on LLM security, focusing on integrity and robustness. Exploratory research direction evolving based on findings and emerging opportunities."
            />
            <ExperienceItem 
              title="Cybersecurity Intern" 
              company="Guardians.cz" 
              period="April 2025 - Present"
              description="Designing and developing internal tools to support security assessments and compliance automation. Participating in client-facing sessions on Secure Software Development Lifecycle (SSDLC) and engaging with the new Czech cybersecurity law (nZKB)."
            />
            <ExperienceItem 
              title="BLE Security Researcher" 
              company="Security@FIT" 
              period="Sept 2023 - Sept 2025"
              description={
                <>
                  Co-authored research on Parallel BLE Advertising Monitoring and developed multi-sniffer probes using ESP32. Extended research for <a href="https://www.vut.cz/studenti/zav-prace/detail/164339?zp_id=164339" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Bachelor Thesis</a> using neural networks (MLPs and 1D CNNs) for real-time BLE connection detection. Awarded at EXCEL@FIT 2025. To be presented at SantaCrypt 2025.
                </>
              }
            />
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> Projects
          </h2>
          <div className="grid gap-4">
            <ProjectCard 
              title="Packet Sniffer (C++)" 
              description="Robust network packet sniffer capable of capturing, parsing, and displaying network traffic. Supports filtering by TCP, UDP, ICMP, ARP."
              link="https://github.com/olexamatej/ipk-packet-sniffer"
            />
            <ProjectCard 
              title="IMAP Client (C++)" 
              description="RFC3501 compliant IMAP client. Authenticates with server, downloads messages, and handles secure connection termination."
              link="https://github.com/olexamatej/isa-imap-client"
            />
            <ProjectCard 
              title="Chat Client (C++)" 
              description="Console-based chat application supporting both UDP and TCP protocols with real-time messaging."
              link="https://github.com/olexamatej/ipk-chat-client"
            />
            <ProjectCard 
              title="BSEC2025 Hackathon Solution (Winner)" 
              description="Winning full-stack solution (Next.js, TailwindCSS) developed under tight deadlines."
              link="https://github.com/olexamatej/bsec-2025"
            />
            <ProjectCard 
              title="Backpropagation Algorithm (C++)" 
              description="Implementation of backpropagation algorithm from scratch for training neural networks. Focus on numerical computation."
              link="#"
            />
          </div>
        </section>

        {/* CTF Experience */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">#</span> CTF Experience
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Actively participate in Capture The Flag (CTF) competitions, focusing on binary exploitation, reverse engineering, and web exploitation.
          </p>
          <div className="space-y-6">
            <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
              <h3 className="text-lg font-medium text-emerald-400 mb-2">CyberApocalypse CTF 2025</h3>
              <div className="flex gap-4 text-sm font-mono text-slate-400 mb-3">
                <span>Rank: 166th / 8130</span>
                <span className="text-emerald-500">•</span>
                <span>Team MVP</span>
              </div>
              <p className="text-slate-300 text-sm">
                Key contributor and team MVP in a global CTF. Authored writeups for <a href="/blogs/contractor.html" className="text-emerald-400 hover:underline">Contractor</a> & <a href="/blogs/strategist.html" className="text-emerald-400 hover:underline">Strategist</a>.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <ProjectCard 
                title="LACTF 2025" 
                description="Writeups and solutions for LACTF 2025 challenges."
                link="https://github.com/olexamatej/lactf2025"
              />
              <ProjectCard 
                title="pwnable.kr" 
                description="Solutions for pwnable.kr wargame challenges."
                link="https://github.com/olexamatej/pwnable.kr"
              />
              <ProjectCard 
                title="picoCTF" 
                description="My progress and scripts for picoCTF problems."
                link="https://github.com/olexamatej/picoctf"
              />
              <ProjectCard 
                title="webhacking.kr" 
                description="Web security challenge solutions."
                link="https://github.com/olexamatej/webhacking.kr"
              />
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
            <p className="text-slate-400 text-sm mt-1">Completed during internship at Guardians.cz</p>
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
              category="Web Exploitation"
              link="/blogs/contractor.html"
            />
            <WriteupLink 
              title="Cyber Apocalypse 2025: Strategist"
              category="Game Hacking / Reverse Engineering"
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

function ExperienceItem({ title, company, period, description }) {
  return (
    <div className="group">
      <div className="flex justify-between items-baseline mb-1">
        <h3 className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">{title}</h3>
        <span className="text-sm text-slate-500 font-mono">{period}</span>
      </div>
      <div className="text-emerald-500/80 text-sm mb-2">{company}</div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function ProjectCard({ title, description, link }) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">{title}</h3>
        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400" />
      </div>
      <p className="text-slate-400 text-sm">{description}</p>
    </a>
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
