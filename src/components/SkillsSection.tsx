import { motion } from "framer-motion";
import { useState } from "react";

const skillCategories: Record<string, { name: string; level: string }[]> = {
  Frontend: [
    { name: "HTML", level: "Advanced" },
    { name: "CSS", level: "Beginner" },
    { name: "JavaScript", level: "Beginner" },
    { name: "React", level: "Beginner" },
    { name: "Tailwind CSS", level: "Beginner" },
    { name: "Vite", level: "Beginner" },
  ],
  Backend: [
    { name: "Node.js", level: "Beginner" },
    { name: "Express.js", level: "Beginner" },
    { name: "MongoDB", level: "Beginner" },
    { name: "Supabase", level: "Beginner" },
  ],
  "Other Tools": [
    { name: "Git & GitHub", level: "Beginner" },
    { name: "VS Code", level: "Advanced" },
    { name: "Figma", level: "Beginner" },
  ],
  "AI/ML & Tools": [
    { name: "ChatGPT", level: "Advanced" },
    { name: "GitHub Copilot", level: "Beginner" },
  ],
};

const levelColor: Record<string, string> = {
  Advanced: "text-green-400",
  Beginner: "text-yellow-400",
};

export default function SkillsSection() {
  const [tab, setTab] = useState("Frontend");

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="section-heading">Skills</h2>
          <p className="section-subtitle mx-auto mt-3">Tools and technologies I've mastered or currently exploring.</p>
        </motion.div>
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {Object.keys(skillCategories).map((cat) => (
            <button key={cat} onClick={() => setTab(cat)} className={`text-sm px-4 py-2 rounded-lg transition-colors ${tab === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {skillCategories[tab].map((skill, i) => (
            <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="skill-badge">
              <div>
                <p className="font-medium text-foreground">{skill.name}</p>
                <p className={`text-xs ${levelColor[skill.level] || "text-muted-foreground"}`}>{skill.level}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
