import HeroSection from "../../../Hero-sec/Hero-nlp";
import { NLPArchitectures, NLPGrowth, NLPIndustries, NLPRoadmap } from "../Artificial Intelligence/nlp";
import CTASection from "../../../components/layout/CTASection";

export default function NLP() {
  return (
    <main>
        <HeroSection/>
        <NLPGrowth/>
        <NLPArchitectures/>
        <NLPRoadmap/>
        <NLPIndustries/>
        <CTASection 
          title="Ready to Scale Your Business with NLP?" 
          subtitle="From sentiment analysis to custom LLMs, we build the language technology that drives growth."
        />
    </main>
  );
}