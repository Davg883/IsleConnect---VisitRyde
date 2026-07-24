import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import TrailCollection from "@/components/TrailCollection";
import HowItWorks from "@/components/HowItWorks";
import WorkedExample from "@/components/WorkedExample";
import SMEHub from "@/components/SMEHub";
import CouncilPitch from "@/components/CouncilPitch";
import Footer from "@/components/Footer";
import SchemaScripts from "@/components/SchemaScripts";

export default function HomePage() {
  return (
    <>
      <SchemaScripts />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WorkedExample />
        <TrailCollection />
        <Showcase />
        <SMEHub />
        <CouncilPitch />
      </main>
      <Footer />
    </>
  );
}
