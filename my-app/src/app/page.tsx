import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import ManufacturingProcess from "../components/ManufacturingProcess/ManufacturingProcess";
import ContactSection from "../components/ContactSection/ContactSection";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Testimonials from "../components/Testimonials/Testimonials";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <Categories />
      <ManufacturingProcess />
      <Testimonials />

      <Footer />
    </div>
  );
}

export default Home;
