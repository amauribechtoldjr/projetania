import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/index.scss";

import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer";

const APP = ({ Component, pageProps }) => {
  const isHomePage = Component.name === "Home";

  return (
    <div className="portfolio-app">
      <Navbar />
      {isHomePage && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>
      {isHomePage && <Footer />}
    </div>
  );
};

export default APP;
