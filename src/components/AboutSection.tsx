import { motion } from "framer-motion";
import { Download } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const personalInfo = [
  { label: "Name", value: "Dicky Alfasi" },
  { label: "Date of Birth", value: "August, 08-2006" },
  { label: "Place of Birth", value: "Klaten, Indonesia" },
  { label: "Email", value: "-" },
  { label: "Phone", value: "-" },
  { label: "Education", value: "Universitas Bengkulu" },
  { label: "IPK", value: "-" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
            <img src={profileImg} alt="About Me" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">Who Am I</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              I am a Electrical Engineering with a keen interest in creating dynamic and responsive web applications. I love to explore new technologies and continuously improve my skills.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">My Focus</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              focus on purpose not girls because gf is temporary success is permanent 😎
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Personal Info</h3>
            <div className="space-y-2">
              {personalInfo.map((info) => (
                <div key={info.label} className="flex gap-2 text-sm">
                  <span className="text-muted-foreground min-w-[120px]">{info.label}:</span>
                  <span className="text-foreground">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
          <a href="#" className="btn-primary inline-flex"><Download size={16} /> Unduh My Resume</a>
        </motion.div>
      </div>
    </section>
  );
}
