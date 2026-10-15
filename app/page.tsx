import { Areas } from "@/components/sections/Areas";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Careers } from "@/components/sections/Careers";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Contact } from "@/components/sections/Contact";
import { EnablingBanner } from "@/components/sections/EnablingBanner";
import { Hero } from "@/components/sections/Hero";
import { Markets } from "@/components/sections/Markets";
import { Services } from "@/components/sections/Services";
import { Technologies } from "@/components/sections/Technologies";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <EnablingBanner />
      <Areas />
      <Markets />
      <Services />
      <CaseStudies />
      <Careers />
      <Technologies />
      <Contact />
    </>
  );
}
