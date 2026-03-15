import { EnterpriseCapabilities, EnterpriseChallenges, WorkflowTransformation, AIStatCountdown } from "../Artificial Intelligence/Aipage";
import HeroSection from "../../../Hero-sec/Hero-ai";
import CTASection from "../../../components/layout/CTASection";

export default function ArtificialIntelligence() {
  return (
    <main>
      <HeroSection />
      <EnterpriseChallenges />
      <WorkflowTransformation />
      <EnterpriseCapabilities />
      <AIStatCountdown />
      <CTASection 
        title="Elevate Your Enterprise with AI" 
        subtitle="The future of intelligence is here. Let Zuneko Labs help your organization lead the automation era."
      />
    </main>
  );
}