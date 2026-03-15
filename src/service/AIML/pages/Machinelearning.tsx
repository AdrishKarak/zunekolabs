import HeroSection from "../../../Hero-sec/Hero-ml";
import { MLArchitectures, MLGrowth, MLIndustries, MLRoadmap } from "../Artificial Intelligence/ml";
import CTASection from "../../../components/layout/CTASection";


export default function ML() {
  return (
     <main>
        <HeroSection/>
        <MLGrowth/>
        <MLArchitectures/>
        <MLRoadmap/>
        <MLIndustries/>
        <CTASection 
          title="Supercharge Your Operations with ML" 
          subtitle="Our predictive models and automation pipelines are designed to solve your most complex enterprise challenges."
        />
      </main>
  );
}