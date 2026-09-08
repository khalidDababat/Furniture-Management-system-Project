import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import {
  companyService,
  categotyService,
  ProjectsService,
} from "@/services/api";
// Storefront chrome. Reads from JSON Server at request time.
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [company, categories, projects] = await Promise.all([
    companyService.getCompany(),
    categotyService.getCategories(),
    ProjectsService.getProjects(),
  ]);

  return (
    <>
      <Navbar company={company} projects={projects} />
      <main>{children}</main>
      <Footer company={company} categories={categories} />
      <WhatsAppButton phone={company.whatsapp} />
      <CartDrawer />
    </>
  );
}
