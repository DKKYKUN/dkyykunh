import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificatesSection from "@/components/CertificatesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <div className="animate-fade-in">
          <Navbar />
          <HeroSection />
          <ScrollReveal direction="up">
            <AboutSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <ProjectsSection />
          </ScrollReveal>
          <ScrollReveal direction="left">
            <ExperienceSection />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <SkillsSection />
          </ScrollReveal>
          <ScrollReveal direction="up">
            <CertificatesSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <TestimonialsSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <ContactSection />
          </ScrollReveal>
          <Footer />
          <AIChat />
        </div>
      )}
    </>
  );
};

export default Index;
