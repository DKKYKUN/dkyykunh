import { useState, useEffect } from "react";
import { Home, User, FolderOpen, Briefcase, Wrench, MessageSquare, Mail, Award, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Skills", href: "#skills", icon: Wrench },
  { label: "Certificates", href: "#certificates", icon: Award },
  { label: "Testimonials", href: "#testimonials", icon: MessageSquare },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((n) => document.querySelector(n.href));
      const scrollY = window.scrollY + 100;
      sections.forEach((sec, i) => {
        if (sec) {
          const el = sec as HTMLElement;
          if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
            setActive(navItems[i].label);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#home" className="text-lg font-bold text-foreground flex items-center gap-2">
          <span className="text-primary">&lt;/&gt;</span> RORR
        </a>
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={active === item.label ? "nav-link-active" : "nav-link px-3 py-2 rounded-lg"}
            >
              <span className="flex items-center gap-1.5">
                <item.icon size={14} />
                {item.label}
              </span>
            </a>
          ))}
        </div>
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-lg ${active === item.label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className="flex items-center gap-2">
                <item.icon size={16} />
                {item.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
