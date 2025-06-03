
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrainSearch from "@/components/TrainSearch";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TrainSearch />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
