import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Download, FolderOpen, Briefcase, Code, FileCode, GraduationCap } from "lucide-react";
import heroArt from "@/assets/hero-art.png";

const stats = [
  { icon: Briefcase, value: "1+ Years", label: "Experience" },
  { icon: Code, value: "JavaScript/C++", label: "Main Language" },
  { icon: FileCode, value: "1 Projects hehe", label: "Total Projects" },
  { icon: GraduationCap, value: "-", label: "IPK" },
];

const socials = [
  { icon: Github, href: "https://github.com/DKKYKUN" },
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "https://www.instagram.com/mdkyalfsy?igsh=YzljYTk1ODg3Zg==" },
  { icon: Twitter, href: "https://x.com/AlfasiDicky?t=9ifCx1BrAJaqGpMsdZDzhQ&s=09" },
];

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Hi, I'm Dkyy 👋
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mt-2 flex items-center gap-1">
              Electrical Engineering ⚡
              <span className="border-r-2 border-primary animate-typewriter-blink">&nbsp;</span>
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-lg">
            I try build modern, responsive web with clean UI and smooth UX blending design and code to create experiences that feel intuitive, fast, and delightful to use.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Ikuti aku di:</span>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <s.icon size={16} />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary"><FolderOpen size={16} /> Explorasi Project Ku</a>
            <a href="#" className="btn-outline"><Download size={16} /> Unduh Resume</a>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">📊 Quick Stats:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stats.map((s, i) => (
                <div key={i} className="stat-card">
                  <s.icon size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-foreground tabular-nums">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <img src={heroArt} alt="Dicky Profile Art" className="w-full h-full object-contain rounded-full" />
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">📋</div>
            <div className="absolute bottom-4 -left-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">JS</div>
            <div className="absolute top-1/2 -right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs">⚙️</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
