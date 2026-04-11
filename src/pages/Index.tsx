import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import FounderSection from "@/components/FounderSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <ProblemSection />
      <SolutionSection />
      <ProcessSection />
      <PricingSection />
      <FounderSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
