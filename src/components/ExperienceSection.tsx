import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Front-End Developer",
    company: "Self-Taught / Freelance",
    period: "2024 - Present",
    desc: "Learning and building modern web applications using React, Tailwind CSS, and various frontend technologies.",
  },
  {
    title: "Backend Developer",
    company: "Self-Taught / Freelance",
    period: "2024 - Present",
    desc: "Building RESTful APIs with Express.js, MongoDB, and implementing JWT authentication.",
  },
  {
    title: "Fullstack Developer",
    company: "Personal Projects",
    period: "2025 - Present",
    desc: "Developing fullstack applications with React and Supabase, including Money Tracker and Link Collector.",
  },
  {
    title: "Electrical Engineering Student",
    company: "Universitas Bengkulu",
    period: "2025 - Present",
    desc: "Studying electrical engineering while pursuing passion in web development and programming.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="section-heading">Experience</h2>
          <p className="section-subtitle mx-auto mt-3">Here is my experience in web development, including projects and what I have done.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glow-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-sm text-primary">{exp.company}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Calendar size={12} />
                    <span className="tabular-nums">{exp.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
