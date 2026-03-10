import HeroSection from "../../../Hero-sec/Hero-genai";
import { GenAIArchitectures, GenAIGrowth, GenAIIndustries, GenAIRoadmap } from "../Artificial Intelligence/Genairest";

export default function GenAI() {
  return (
    <main>
        <HeroSection/>
        <GenAIGrowth/>
        <GenAIArchitectures/>
        <GenAIRoadmap/>
        <GenAIIndustries/>
     </main>
  );
}