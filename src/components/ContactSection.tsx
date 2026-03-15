import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Github, Linkedin, Instagram, Twitter, Heart, Coffee } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", desc: "Explore code & projects", href: "https://github.com/DKKYKUN" },
  { icon: Linkedin, label: "LinkedIn", desc: "I'm really not have linkedin", href: "#" },
  { icon: Instagram, label: "Instagram", desc: "My life Updates", href: "https://www.instagram.com/mdkyalfsy?igsh=YzljYTk1ODg3Zg==" },
  { icon: Twitter, label: "Twitter", desc: "Random", href: "https://x.com/AlfasiDicky?t=9ifCx1BrAJaqGpMsdZDzhQ&s=09" },
];

export default function ContactSection() {
  const [tab, setTab] = useState<"contact" | "support">("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="section-heading">Contact Me</h2>
          <p className="section-subtitle mx-auto mt-3">Reach out via form, social media, or support platforms.</p>
        </motion.div>
        <div className="flex justify-center gap-2 mb-8">
          <button onClick={() => setTab("contact")} className={`text-sm px-4 py-2 rounded-lg transition-colors ${tab === "contact" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>Contact Me</button>
          <button onClick={() => setTab("support")} className={`text-sm px-4 py-2 rounded-lg transition-colors ${tab === "support" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>Support Me</button>
        </div>
        <div className="max-w-3xl mx-auto">
          {tab === "contact" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="glow-card p-4 flex items-center gap-3 block">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><s.icon size={18} className="text-primary" /></div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Kirimi Aku Pesan</h3>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your Email" className="w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary" />
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your Message" rows={4} className="w-full bg-secondary/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                  <button className="btn-primary w-full justify-center"><Send size={14} /> Send Message</button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8 text-center space-y-4">
              <div className="flex justify-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"><Heart size={24} className="text-primary" /></div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"><Coffee size={24} className="text-primary" /></div>
              </div>
              <p className="text-muted-foreground text-sm">Dukung saya melalui platform di bawah ini 💙</p>
              <div className="flex justify-center gap-3">
                <a href="#" className="btn-primary"><Heart size={14} /> Sponsor</a>
                <a href="#" className="btn-outline"><Coffee size={14} /> Buy Me Coffee</a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
