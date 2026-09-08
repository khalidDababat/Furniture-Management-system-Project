import { getHomeData } from "@/services/api";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import Catalog from "@/components/Catalog";
import WhyChooseUs from "@/components/WhyChooseUs";
import CompletedProjects from "@/components/CompletedProjects";
import TrustedClients from "@/components/TrustedClients";
import AboutSection from "@/components/AboutSection";
import Careers from "@/components/Careers";
import ContactSection from "@/components/ContactSection";

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
