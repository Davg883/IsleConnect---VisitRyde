import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import HowItWorks from "@/components/HowItWorks";
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
        <Showcase />
        <SMEHub />
        <CouncilPitch />
      </main>
      <Footer />
    </>
  );
}
