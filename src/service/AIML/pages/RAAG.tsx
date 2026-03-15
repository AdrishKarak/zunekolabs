import HeroSection from "../../../Hero-sec/Hero-rag";
import { RAGArchitectures, RAGGrowth, RAGIndustries, RAGRoadmap } from "../Artificial Intelligence/rag";
import CTASection from "../../../components/layout/CTASection";

export default function RAG() {
    return (
      <main>
        <HeroSection />
        <RAGGrowth />
        <RAGArchitectures />
        <RAGRoadmap />
        <RAGIndustries />
        <CTASection 
          title="Build High-Precision AI with RAG" 
          subtitle="Stop hallucinations and start using your own data to power context-aware AI applications."
        />
      </main>
    );
}