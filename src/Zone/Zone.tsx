import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ZoneList from "./ZoneList";
import "../Zone/Zone.css";
import zonesData from "./zonesData";

const Zone: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="zone-page">
        <div className="sidebar">
          <div className="line-zone"></div>
          <div>
            <h1 className="zone-title">ZONE</h1>
            <h2 className="zone-subtitle">Sibiu</h2>
          </div>
        </div>
        <ZoneList zones={zonesData} />
      </div>
      <Footer />
    </>
  );
};

export default Zone;
