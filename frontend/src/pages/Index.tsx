import FloatingNavbar from "@/components/FloatingNavbar";
import Hero from "@/components/Hero";
import WhyPreferee from "@/components/WhyPreferee";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingNavbar />
      <Hero />
      <WhyPreferee />
      <Contact />
    </div>
  );
};

export default Index;
