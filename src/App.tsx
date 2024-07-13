import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Template from "./components/Template";
import WhyKlic from "./components/WhyKlic";
import ZoneSibiu from "./components/ZoneSibiu";
import News from "./components/News";
import Footer from "./components/Footer";
import Apartamente from "./Rezidential/Apartamente/Apartamente";
import SpatiiComerciale from "./Comercial/SpatiiComerciale";
import Rezidential from "./Rezidential/Rezidential";
import ApartamenteDetalii from "./Rezidential/Apartamente/ApartamenteDetalii";
import ListaAgenti from "./Agenti/ListaAgenti";
import Zone from "./Zone/Zone";
import ZoneDetail from "./Zone/ZoneDetail";
import Case from "./Rezidential/Case/Case";
import CaseDetalii from "./Rezidential/Case/CaseDetalii";
import Evaluare from "./components/Evaluare";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Template" element={<Template />} />
        <Route path="/WhyKlic" element={<WhyKlic />} />
        <Route path="/ZoneSibiu" element={<ZoneSibiu />}></Route>
        <Route path="/News" element={<News />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Rezidential" element={<Rezidential />} />
        <Route path="/Apartamente" element={<Apartamente />} />
        <Route path="/apartament/:id" element={<ApartamenteDetalii />} />
        <Route path="/Case" element={<Case />} />
        <Route path="/house/:id" element={<CaseDetalii />} />
        <Route path="/SpatiiComerciale" element={<SpatiiComerciale />} />
        <Route path="/evaluare" element={<Evaluare />} />
        <Route path="ListaAgenti" element={<ListaAgenti />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/zone/:id" element={<ZoneDetail />} />
      </Routes>
    </>
  );
};

export default App;
