import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Why Preferee", href: "#why-preferee" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ease-in-out ${
          isScrolled 
            ? "bg-card/30 backdrop-blur-xl shadow-glow border border-border/20 px-8 py-2 w-auto" 
            : "bg-card/20 backdrop-blur-xl shadow-soft border border-border/30 px-12 py-4 w-[90%] max-w-4xl"
        } rounded-full`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-electric rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-110">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-foreground hidden sm:block hover:text-green-400 transition-colors duration-300">Preferee</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 px-4 py-2 rounded-full relative overflow-hidden group"
              >
                {/* Background glow that slides in */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 rounded-full"></div>
                
                {/* Border glow */}
                <div className="absolute inset-0 border border-transparent group-hover:border-green-400/30 rounded-full transition-all duration-300"></div>
                
                {/* Text */}
                <span className="relative z-10">{item.name}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-card/40 rounded-full transition-all duration-300 hover:scale-110 relative overflow-hidden group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 rounded-full"></div>
            
            <div className="relative z-10">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/30">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 py-2 px-3 rounded-lg relative overflow-hidden group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/15 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 rounded-lg"></div>
                  <span className="relative z-10">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default FloatingNavbar;