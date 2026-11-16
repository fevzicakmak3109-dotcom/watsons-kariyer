import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { JobSection } from "@/components/JobSection";
import { CallFlow } from "@/components/CallFlow";
import { Benefits } from "@/components/Benefits";
import { Process } from "@/components/Process";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { MobileApplyButton } from "@/components/MobileApplyButton";
import { VisitorPing } from "@/components/VisitorPing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <JobSection />
        <CallFlow />
        <Benefits />
        <Process />
        <ApplicationForm />
        <Faq />
      </main>
      <Footer />
      <MobileApplyButton />
      <VisitorPing />
    </>
  );
}
