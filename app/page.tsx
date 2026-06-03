import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Products from "@/components/Products";
import Models from "@/components/Models";
import Corporate from "@/components/Corporate";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/StructuredData";
import { getCmsPageMetadata } from "@/lib/cmsMetadata";

const fallbackMetadata: Metadata = {
  title: "Pile Perde Ankara Çayyolu - Perde, Jaluzi, Stor Perde",
  description: "Pile Perde Ankara Çayyolu showroom, perde modelleri ve ölçü hizmetleri.",
};

export const generateMetadata = () => getCmsPageMetadata("home", fallbackMetadata);

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <Hero />
      <Products />
      <Models />
      <Corporate />
      <About />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </>
  );
}
