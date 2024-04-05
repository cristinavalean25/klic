import Template from "./Template";
import "../index.css";
import Proprieties from "./Proprieties";
import Cifre from "./Cifre";
import WhyKlic from "./WhyKlic";
import ZoneSibiu from "./ZoneSibiu";
import News from "./News";
import Footer from "./Footer";
import AddFileInApi from "./AddFileInApi";
import ScrollToTop from "./ScrollToTop ";

function Home() {
  return (
    <div className="App">
      <ScrollToTop />
      <Template />
      <AddFileInApi />
      <Proprieties />
      <Cifre />
      <WhyKlic />
      <ZoneSibiu />
      <News />
      <Footer />
    </div>
  );
}

export default Home;
