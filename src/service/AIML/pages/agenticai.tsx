import HeroSection from "../../../Hero-sec/Hero-agenticai";
import { AgenticAIArchitectures, AgenticAIGrowth, AgenticAIIndustries, AgenticAIRoadmap } from "../Artificial Intelligence/agent";
import CTASection from "../../../components/layout/CTASection";

export default function AgenticAI() {
  return (
    <main>
      <HeroSection />
      <AgenticAIGrowth />
      <AgenticAIArchitectures />
      <AgenticAIRoadmap />
      <AgenticAIIndustries />
      <CTASection 
        title="Deploy Your First Agentic Workforce" 
        subtitle="Autonomous agents that don't just chat, but execute complex workflows across your enterprise stack."
      />
    </main>
  );
}