import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Prizes from "@/components/Prizes";
import ProblemStatement from "@/components/ProblemStatement";
import Registration from "@/components/Registration";
import RulesGuidelines from "@/components/RulesGuidelines";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      <Hero />
      <About />
      <Timeline />
      <ProblemStatement />
      <RulesGuidelines />
      <Prizes />
      <FAQ />
      <Registration />
      <Footer />
    </div>
  );
}
