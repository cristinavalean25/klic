import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Template from "./components/Template";
import Proprietati from "./Proprietati/Proprietati";
import WhyKlic from "./components/WhyKlic";
import ZoneSibiu from "./components/ZoneSibiu";
import News from "./components/News";
import Footer from "./components/Footer";
import Apartamente from "./Rezidential/Apartamente";
import Navbar from "./components/Navbar";
import SpatiiComerciale from "./Comercial/SpatiiComerciale";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/" element={<Home />} />
        <Route path="/Template" element={<Template />} />
        <Route path="/Proprietati" element={<Proprietati />} />
        <Route path="/WhyKlic" element={<WhyKlic />} />
        <Route path="/ZoneSibiu" element={<ZoneSibiu />} />
        <Route path="/News" element={<News />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Apartamente" element={<Apartamente />} />
        <Route path="/SpatiiComerciale" element={<SpatiiComerciale />} />
      </Routes>
    </>
  );
};

export default App;
