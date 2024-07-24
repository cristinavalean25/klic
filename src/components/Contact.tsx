import React from "react";
import "../CssPages/Contact.css";
import Navbar from "./Navbar";
import imgCity from "../Zone/zoneImg/treistejari.jpg"; // Make sure the image file name matches

const Contact: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container-page">
        <div className="row">
          <div className="col-md-6 contact-left">
            <h1>CONTACT US</h1>
            <p>KLIC - Imobiliarele incep cu noi</p>
            <p className="headquarters">KLIC IMOBILIARE</p>
            <p>
              Adresa: Stefan Cel Mare, Nr. 65
              <br />
              SIBIU, RO
            </p>
            <p className="connect">CONNECT</p>
            <div className="social-icons">
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-wechat"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
          <div className="col-md-6 contact-right">
            <img src={imgCity} alt="City View" className="img-responsive" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
