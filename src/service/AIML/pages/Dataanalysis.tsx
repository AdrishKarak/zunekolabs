import HeroSection from "../../../Hero-sec/Hero--da";
import { DAArchitectures, DAGrowth, DAIndustries, DARoadmap } from "../Artificial Intelligence/da";
import CTASection from "../../../components/layout/CTASection";

export default function DATAANALYSIS() {
  return (
   <main>
    <HeroSection/>
    <DAGrowth/> 
    <DAArchitectures/>
    <DARoadmap/>
    <DAIndustries/>
    <CTASection 
        title="Turn Your Data into Decisions" 
        subtitle="Uncover hidden insights with our advanced data analytics and visualization systems."
      />
   </main>
  );
}