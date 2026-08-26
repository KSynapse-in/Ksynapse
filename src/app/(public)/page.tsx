import HeroSection from "@/components/sections/HeroSection";
import ESGChangingBusiness from "@/components/sections/ESGChangingBusiness";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatIsESG from "@/components/sections/WhatIsESG";
import MeetKSynapse from "@/components/sections/MeetKSynapse";
import SingleEntryAnimation from "@/components/sections/SingleEntryAnimation";
import AIIntelligenceLayer from "@/components/sections/AIIntelligenceLayer";
import PlatformCapabilities from "@/components/sections/PlatformCapabilities";
import HowItWorks from "@/components/sections/HowItWorks";
import ComplianceHubPreview from "@/components/sections/ComplianceHubPreview";
import WhyChooseKSynapse from "@/components/sections/WhyChooseKSynapse";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ESGChangingBusiness />
      <ProblemSection />
      <WhatIsESG />
      <MeetKSynapse />
      <SingleEntryAnimation />
      <ComplianceHubPreview />
      <AIIntelligenceLayer />
      <PlatformCapabilities />
      <HowItWorks />
      <WhyChooseKSynapse />
      <FinalCTA />
    </>
  );
}
