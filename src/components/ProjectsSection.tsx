import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Code } from "lucide-react";

const projects = [
  {
    title: "Money Tracker",
    category: "Fullstack",
    year: "2025",
    status: "Completed",
    features: ["Supabase Auth + Database", "CRUD transaksi harian", "Statistik pengeluaran", "Dark mode UI"],
    tech: ["React", "Supabase", "Tailwind"],
  },
  {
    title: "Personal Portfolio",
    category: "Frontend",
    year: "2025",
    status: "Completed",
    features: ["Tailwind CSS", "Animated tabs"],
    tech: ["Html", "Css"],
  },
  {
    title: "AI Chatbot JSON",
    category: "Fullstack",
    year: "2025",
    status: "Completed",
    features: ["React + Express backend", "Input belajar dari user", "Simpan ke JSON", "Logic respons otomatis"],
    tech: ["React", "Express", "Node.js"],
  },
  {
    title: "RESTful API Service",
    category: "Backend",
    year: "2024",
    status: "Completed",
    features: ["Express.js + MongoDB", "JWT Auth", "CRUD user & posts", "Swagger API docs"],
    tech: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Weather App",
    category: "Frontend",
    year: "2024",
    status: "Completed",
    features: ["Fetch API OpenWeather", "Search by city", "Responsive UI", "Dark mode"],
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Link Collector",
    category: "Fullstack",
    year: "2025",
    status: "In Progress",
    features: ["User auth (Supabase)", "Simpan link pribadi", "Search + filter", "Responsive design"],
    tech: ["React", "Supabase"],
  },
];

const filters = ["All Project", "Frontend", "Backend", "Fullstack"];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All Project");
  const [page, setPage] = useState(0);

  const filtered = filter === "All Project" ? projects : projects.filter((p) => p.category === filter);
  const perPage = 3;
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="section-heading">Projects</h2>
          <p className="section-subtitle mx-auto mt-3">
            Explore some of the works I've built — from slick frontend UIs, powerful backend APIs, to fullstack apps.
          </p>
        </motion.div>
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {filters.map((f) => (
            <button key={f} onClick={() => { setFilter(f); setPage(0); }} className={`text-sm px-4 py-2 rounded-lg transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {paged.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glow-card p-5 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.status === "Completed" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{p.category} • {p.year}</p>
              <div className="mb-3">
                <p className="text-xs font-semibold text-foreground mb-1">Features:</p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {p.features.map((f) => <li key={f}>• {f}</li>)}
                </ul>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-foreground mb-1">Tech Stack:</p>
                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t) => <span key={t} className="badge-tech">{t}</span>)}
                </div>
              </div>
              <div className="mt-auto flex gap-2">
                <button className="btn-primary text-xs py-2 px-3"><ExternalLink size={12} /> Demo</button>
                <button className="btn-outline text-xs py-2 px-3"><Code size={12} /> Code</button>
              </div>
            </motion.div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground disabled:opacity-30">Previous</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`text-sm px-3 py-1.5 rounded-lg ${page === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1} className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground disabled:opacity-30">Next</button>
          </div>
        )}
      </div>
    </section>
  );
}
