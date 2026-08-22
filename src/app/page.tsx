import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutFoundationSection from "@/components/AboutFoundationSection";
import ProblemsSection from "@/components/ProblemsSection";
import SolutionSection from "@/components/SolutionSection";
import RealThingSection from "@/components/RealThingSection";
import PricingSection from "@/components/PricingSection";
import BiomechanicalBenefitsSection from "@/components/BiomechanicalBenefitsSection";
import TheAnswerSection from "@/components/TheAnswerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#F6F3ED]">
      <Header />
      <HeroSection />
      <AboutFoundationSection />
      <ProblemsSection />
      <SolutionSection />
      <RealThingSection />
      <PricingSection />
      <BiomechanicalBenefitsSection />
      <TheAnswerSection />
      <Footer />
    </main>
  );
}
