import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Template from "./components/Template";
import Contact from "./components/Contact";
import WhyKlic from "./components/WhyKlic";
import ZoneSibiu from "./components/ZoneSibiu";
import News from "./components/News";
import Footer from "./components/Footer";
import Apartamente from "./components/Rezidential/Apartamente/Apartamente";
import Rezidential from "./components/Rezidential/Rezidential";
import ApartamenteDetalii from "./components/Rezidential/Apartamente/ApartamenteDetalii";
import ListaAgenti from "./components/Agenti/ListaAgenti";
import Zone from "./Zone/Zone";
import ZoneDetail from "./Zone/ZoneDetail";
import Case from "./components/Rezidential/Case/Case";
import CaseDetalii from "./components/Rezidential/Case/CaseDetalii";
import Evaluare from "./components/Evaluare";
import Terenuri from "./components/Nerezidential/Terenuri/Terenuri";
import Comercial from "./components/Nerezidential/SpatiiComerciale/Comercial";
import TerenuriDetalii from "./components/Nerezidential/Terenuri/TerenuriDetalii";
import ComercialDetalii from "./components/Nerezidential/SpatiiComerciale/ComercialDetalii";
import Industrial from "./components/Nerezidential/SpatiiIndustriale/Industrial";
import ApartamenteDeInchiriat from "./components/Rent/ApartamenteDeInchiriat";
import ApartamenteDeInchiriatDetails from "./components/Rent/ApartamenteDeInchiriatDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Template" element={<Template />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/WhyKlic" element={<WhyKlic />} />
        <Route path="/ZoneSibiu" element={<ZoneSibiu />} />
        <Route path="/News" element={<News />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Rezidential" element={<Rezidential />} />
        <Route path="/Apartamente" element={<Apartamente />} />
        <Route
          path="/Apartamente-de-inchiriat"
          element={<ApartamenteDeInchiriat />}
        />
        <Route
          path="/apartament/:id"
          element={<ApartamenteDeInchiriatDetails />}
        />
        <Route path="/apartament/:id" element={<ApartamenteDetalii />} />
        <Route path="/Case" element={<Case />} />
        <Route path="/house/:id" element={<CaseDetalii />} />
        <Route path="/Industrial" element={<Industrial />} />
        <Route path="/terenuri" element={<Terenuri />} />\
        <Route path="/teren/:id" element={<TerenuriDetalii />} />
        <Route path="/comercial" element={<Comercial />} />
        <Route path="/comercial/:idnum" element={<ComercialDetalii />} />
        <Route path="/evaluare" element={<Evaluare />} />
        <Route path="/ListaAgenti" element={<ListaAgenti />} />{" "}
        <Route path="/zone" element={<Zone />} />
        <Route path="/zone/:id" element={<ZoneDetail />} />
      </Routes>
    </>
  );
};

export default App;
