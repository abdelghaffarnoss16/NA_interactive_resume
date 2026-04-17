/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Globe, 
  Layers, 
  Server, 
  Shield, 
  Code2, 
  ChevronRight,
  Database,
  Cloud,
  Container
} from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  tags: string[];
  icon: React.ReactNode;
}

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 'job-platform',
    title: 'Job Application Platform',
    subtitle: 'Microservices Architecture',
    description: [
      'Designed and developed a job posting platform enabling companies to publish opportunities and candidates to apply online.',
      'Refactored the system into a scalable microservices architecture and containerized services for deployment in a cloud-native environment.',
      'Explored container orchestration, virtualization, and security practices to improve scalability, resilience, and system reliability.'
    ],
    tags: ['Java', 'Spring Boot', 'RabbitMQ', 'Eureka', 'Resilience4j', 'Docker', 'Kubernetes'],
    icon: <Globe className="w-5 h-5" />
  }
];

const EXPERIENCES: Experience[] = [
  {
    id: 'pulse-digital',
    company: 'PULSE.digital MAROC',
    role: 'Intern | Software Engineer',
    period: 'March 2024 – August 2024',
    location: 'Marrakech',
    description: [
      'Contributed to the development of a web application using Symfony (PHP) for backend logic and API endpoints.',
      'Built the frontend user interface using React.js and integrated it with Axios.',
      'Containerized the services using Docker and deployed on AWS EC2 and Azure VM for infrastructure cost analysis.'
    ]
  }
];

const SKILLS = [
  { category: 'Backend', items: ['Java', 'Spring Boot', 'Symfony (PHP)', 'REST APIs', 'RabbitMQ', 'Feign'], icon: <Server className="w-4 h-4" /> },
  { category: 'Frontend', items: ['React.js', 'Tailwind CSS', 'Axios', 'Motion'], icon: <Globe className="w-4 h-4" /> },
  { category: 'Cloud & DevOps', items: ['Kubernetes', 'OpenShift', 'Docker', 'AWS EC2', 'Azure VM'], icon: <Cloud className="w-4 h-4" /> },
  { category: 'Infrastructure', items: ['VMware', 'Network Policies', 'Security Context', 'Microservices'], icon: <Layers className="w-4 h-4" /> }
];

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-[1px] bg-accent" />
      <span className="mono-tag">Section</span>
    </div>
    <h2 className="text-4xl font-bold mb-4">{title}</h2>
    {subtitle && <p className="text-text-secondary max-w-2xl">{subtitle}</p>}
  </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [view, setView] = useState<'info' | 'tech'>('info');

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative frosted-glass rounded-3xl overflow-hidden hover:border-accent transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="p-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-white/5 border border-glass-border rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
            {project.icon}
          </div>
          <div className="flex bg-white/5 rounded-lg p-1 border border-glass-border">
            <button 
              onClick={() => setView('info')}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${view === 'info' ? 'bg-white/10 text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setView('tech')}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${view === 'tech' ? 'bg-white/10 text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              System Logs
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'info' ? (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors">{project.title}</h3>
              <p className="text-text-secondary font-mono text-xs uppercase tracking-widest mb-6">{project.subtitle}</p>
              
              <ul className="space-y-3 mb-8">
                {project.description.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                    <ChevronRight className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-glass-border rounded-lg text-[11px] font-medium text-text-secondary hover:bg-white/10 hover:text-text-primary transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tech"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-black/40 border border-glass-border rounded-2xl p-6 font-mono text-[11px] leading-relaxed text-blue-300/80 overflow-hidden relative"
            >
              <div className="absolute top-4 right-4 flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <p className="text-accent mb-2">/usr/noussair/projects/{project.id} % ls -la</p>
              <div className="space-y-1">
                <p><span className="text-blue-400">drwxr-xr-x</span> 2 root root 4096 Apr 17 2024 .</p>
                <p><span className="text-blue-400">drwxr-xr-x</span> 2 root root 4096 Apr 17 2024 src/</p>
                <p><span className="text-white/60">-rw-r--r--</span> 1 root root  204 Apr 17 2024 docker-compose.yml</p>
                <p><span className="text-white/60">-rw-r--r--</span> 1 root root  432 Apr 17 2024 kubernetes-spec.json</p>
              </div>
              <p className="text-yellow-400 mt-4 mb-2">Checking health status...</p>
              <div className="space-y-1">
                <p>[OK] API Gateway: 10.0.0.1 (Healthy)</p>
                <p>[OK] Auth Service: 10.0.0.2 (Healthy)</p>
                <p>[OK] RabbitMQ: Cluster Stable</p>
              </div>
              <motion.div 
                className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center"
              >
                <span className="text-[10px] text-accent animate-pulse">● System operational</span>
                <span className="text-white/20">ID: 0x7E3F2</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [terminalText, setTerminalText] = useState('');
  const fullText = '> system_init --user noussair --role engineer...';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTerminalText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative text-text-primary selection:bg-accent selection:text-white pb-24" id="app">
      <div className="mesh-gradient" />
      
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center frosted-glass rounded-full px-8 py-3 pointer-events-auto">
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-lg tracking-tight">NA.</span>
            <div className="h-4 w-[1px] bg-glass-border" />
            <span className="font-mono text-[10px] text-text-secondary uppercase tracking-[0.2em] hidden sm:block">Portfolio 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:noussairabdelghaffar10@gmail.com" className="text-text-secondary hover:text-accent transition-colors"><Mail className="w-4 h-4" /></a>
            <a href="https://linkedin.com/in/abdelghaffarnoussair" className="text-text-secondary hover:text-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
            <button className="bg-accent text-white px-5 py-1.5 rounded-full text-xs font-medium hover:shadow-lg hover:shadow-accent/40 transition-all cursor-pointer">
              Resume.pdf
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-48 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 relative z-10">
        {/* Sidebar-style Header for Desktop */}
        <aside className="lg:h-[calc(100vh-12rem)] lg:sticky lg:top-48 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="frosted-glass rounded-3xl p-10 h-full flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                {terminalText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-tighter leading-none mb-4">
              NOUSSAIR<br />ABDELGHAFFAR
            </h1>
            
            <p className="text-sm text-accent font-medium uppercase tracking-[2px] mb-8">
              Software Engineer
            </p>

            <ul className="space-y-4 mb-12">
              <li className="text-sm text-text-primary font-semibold border-b border-accent pb-2">Projects (05)</li>
              <li className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Experience</li>
              <li className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Stack</li>
              <li className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">Education</li>
            </ul>

            <div className="mt-auto pt-6 border-t border-glass-border space-y-3">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-text-secondary">Availability</span>
                <span className="font-bold">Open for Work</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-text-secondary">Location</span>
                <span className="font-bold">Marrakech</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-text-secondary">Experience</span>
                <span className="font-bold">Engineer</span>
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Main Content Area */}
        <main className="space-y-32">
          {/* Summary / About */}
          <section id="hero">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-2xl text-text-secondary leading-relaxed font-light">
                Specializing in <span className="text-text-primary font-medium">scalable backend systems</span> and microservices architectures. 
                Passionate about bridging the gap between application development and cloud infrastructure with high-performance solutions.
              </p>
            </motion.div>
          </section>

          {/* Projects */}
          <section id="projects">
            <SectionHeader 
              title="Works" 
              subtitle="Architecting systems with modern frameworks and cloud-native practices." 
            />
            
            <div className="grid grid-cols-1 gap-6">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* Experience */}
          <section id="experience">
            <SectionHeader 
              title="Career" 
              subtitle="My journey through software engineering roles and corporate internships." 
            />
            
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 p-10 frosted-glass rounded-3xl hover:bg-white/[0.05] transition-colors"
                >
                  <div>
                    <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-1">{exp.period}</p>
                    <h4 className="font-bold text-text-primary">{exp.company}</h4>
                    <p className="text-sm text-text-secondary">{exp.location}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">{exp.role}</h3>
                    <ul className="space-y-3">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills">
            <SectionHeader 
              title="Stack" 
              subtitle="A technical breakdown of my proficiency across core departments." 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILLS.map((skill, idx) => (
                <motion.div 
                  key={skill.category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 frosted-glass rounded-3xl flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-white/5 rounded-lg text-accent border border-glass-border">
                      {skill.icon}
                    </div>
                    <h4 className="font-bold text-text-primary">{skill.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {skill.items.map(item => (
                      <span key={item} className="text-xs text-text-secondary px-3 py-1 bg-white/5 border border-glass-border rounded-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section id="education">
            <SectionHeader 
              title="Study" 
              subtitle="Foundational knowledge in network engineering and computer science." 
            />

            <div className="relative border-l border-glass-border ml-4 pl-12 space-y-16">
              <div className="relative">
                <div className="absolute -left-[54px] top-1 w-3 h-3 rounded-full bg-accent ring-8 ring-bg" />
                <div>
                  <p className="mono-tag mb-3 inline-block">2024</p>
                  <h3 className="text-xl font-bold mb-1">Engineering Degree of Network and Telecommunications</h3>
                  <p className="text-text-secondary mb-2">National School of Applied Science, Safi</p>
                  <p className="text-sm text-text-secondary/50 italic">Graduated October 2024</p>
                </div>
              </div>

              <div className="relative opacity-60">
                <div className="absolute -left-[54px] top-1 w-3 h-3 rounded-full bg-glass-border ring-8 ring-bg" />
                <div>
                  <p className="mono-tag mb-3 inline-block">2022</p>
                  <h3 className="text-xl font-bold mb-1">University Diploma of Technology (DUT) in Computer Science</h3>
                  <p className="text-text-secondary">École Normale Supérieure, Marrakech</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-24 border-t border-glass-border flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="text-center sm:text-left">
              <p className="font-display font-bold text-2xl mb-2 tracking-tight">Let's build something scalable.</p>
              <p className="text-text-secondary text-sm">© 2026 Noussair Abdelghaffar. Powered by Code & Coffee.</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="p-3 rounded-full frosted-glass hover:bg-accent hover:text-white transition-all"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-full frosted-glass hover:bg-accent hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-3 rounded-full frosted-glass hover:bg-accent hover:text-white transition-all"><Mail className="w-5 h-5" /></a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
