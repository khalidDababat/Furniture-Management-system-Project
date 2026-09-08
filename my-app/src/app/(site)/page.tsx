import { getHomeData } from "@/services/api";
import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import Categories from "@/components/Categories/Categories";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import CompletedProjects from "@/components/CompletedProjects/CompletedProjects";
import TrustedClients from "@/components/TrustedClients/TrustedClients";
import AboutSection from "@/components/AboutSection/AboutSection";
import Careers from "@/components/Careers/Careers";
import ContactSection from "@/components/ContactSection/ContactSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const d = await getHomeData();
  return (
    <>
      <Hero slides={d.heroSlides} />
      <Stats stats={d.company.stats} />
      <Categories categories={d.categories} />
      <WhyChooseUs items={d.whyChooseUs} established={d.company.established} />
      <CompletedProjects projects={d.projects} />
      <TrustedClients clients={d.clients} />
      <AboutSection
        company={d.company}
        points={d.whyChooseUs.slice(0, 4)}
        image={d.heroSlides[1].image}
      />
      <Careers jobs={d.jobs} />
      <ContactSection company={d.company} />
    </>
  );
}
