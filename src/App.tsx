import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Template from "./components/Template";
import WhyKlic from "./components/WhyKlic";
import ZoneSibiu from "./components/ZoneSibiu";
import News from "./components/News";
import Footer from "./components/Footer";
import Apartamente from "./Rezidential/Apartamente/Apartamente";
import Navbar from "./components/Navbar";
import SpatiiComerciale from "./Comercial/SpatiiComerciale";
import Case from "./Rezidential/Case";
import Rezidential from "./Rezidential/Rezidential";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/" element={<Home />} />
        <Route path="/Template" element={<Template />} />
        <Route path="/WhyKlic" element={<WhyKlic />} />
        <Route path="/ZoneSibiu" element={<ZoneSibiu />} />
        <Route path="/News" element={<News />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Rezidential" element={<Rezidential />} />
        <Route path="/Apartamente" element={<Apartamente />} />
        <Route path="/Case" element={<Case />} />
        <Route path="/SpatiiComerciale" element={<SpatiiComerciale />} />
      </Routes>
    </>
  );
};

export default App;
