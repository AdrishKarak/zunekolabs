import HeroSection from "../../../Hero-sec/Hero-genai";
import { GenAIArchitectures, GenAIGrowth, GenAIIndustries, GenAIRoadmap } from "../Artificial Intelligence/Genairest";
import CTASection from "../../../components/layout/CTASection";

export default function GenAI() {
  return (
    <main>
        <HeroSection/>
        <GenAIGrowth/>
        <GenAIArchitectures/>
        <GenAIRoadmap/>
        <GenAIIndustries/>
        <CTASection 
          title="Lead the GenAI Revolution" 
          subtitle="Deploy production-ready Generative AI that transforms your creative and technical workflows."
        />
     </main>
  );
}