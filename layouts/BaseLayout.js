import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer";

const BaseLayout = ({ children, page = '' }) => {
  const isHomePage = page === "Home";

  return (
    <div className="portfolio-app">
      <Navbar />
      {isHomePage && <Hero />}
      <div className="container">
        {children}
      </div>
      {isHomePage && <Footer />}
    </div>
  );
};

export default BaseLayout;
