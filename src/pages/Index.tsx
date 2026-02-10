import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductsPreview } from "@/components/ProductsPreview";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductsPreview />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
