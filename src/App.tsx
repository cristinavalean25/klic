import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Template from "./components/Template";
import Proprietati from "./Proprietati/Proprietati";
import WhyKlic from "./components/WhyKlic";
import ZoneSibiu from "./components/ZoneSibiu";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Template" element={<Template />} />
        <Route path="/Proprietati" element={<Proprietati />} />
        <Route path="/WhyKlic" element={<WhyKlic />} />
        <Route path="/ZoneSibiu" element={<ZoneSibiu />} />
      </Routes>
    </>
  );
}

export default App;
