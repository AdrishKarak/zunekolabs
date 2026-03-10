import HeroSection from "../../../Hero-sec/Hero-agenticai";
import { AgenticAIArchitectures, AgenticAIGrowth, AgenticAIIndustries, AgenticAIRoadmap } from "../Artificial Intelligence/agent";

export default function AgenticAI() {
  return (
    <main>
      <HeroSection />
      <AgenticAIGrowth />
      <AgenticAIArchitectures />
      <AgenticAIRoadmap />
      <AgenticAIIndustries />
    </main>
  );
}