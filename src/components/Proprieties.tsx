import "../CssPages/Proprieties.css";
import { detalii } from "./detalii";
import imgCasa from "../Images/case-img.jpg";
import imgAp from "../Images/apartamente-img.png";
import imgComercial from "../Images/comercial-img.png";
import imgInchirieri from "../Images/inchirieri-img.jpg";
import imgZone from "../Images/zone.png";
import { Link } from "react-router-dom";

function Proprieties() {
  const { proprietati } = detalii;
  const images = [
    {
      link: "/Rezidential",
      imgSrc: imgCasa,
      textTitle: "REZIDENTIALE",
      textCase: "CASE - APARTAMENTE",
      textAp: "",
      textTere: "TERENURI - CASE DE VACANTA",
      textVacantion: "",
    },
    {
      link: "/Case",
      imgSrc: imgAp,
      textTitle: "ANSAMBLE NOI",
      textCase: "CASE - VILE",
      textAp: "",
      textTere: "BLOCURI - APARTAMENTE",
      textVacantion: "",
    },
    {
      link: "/",
      imgSrc: imgComercial,
      textTitle: "COMERCIALE",
      textCase: "SPATII - BIROURI - HALE ",
      textAp: "",
      textTere: "HOTELURI - PENSIUNI - AFACERI",
      textVacantion: "",
    },
    {
      link: "/",
      imgSrc: imgInchirieri,
      textTitle: "INCHIRIEIRI",
      textCase: "REXIDENTIALE - COMERCIALE ",
      textAp: "",
      textTere: "",
      textVacantion: "",
    },
    {
      link: "/",
      imgSrc: imgZone,
      textTitle: "ZONE",
      textCase: "CARTIERE SIBIU",
      textAp: "",
      textTere: "IMPREJURIMI SIBIU",
      textVacantion: "",
    },
  ];

  return (
    <>
      <div className="container-proprieties">
        <div className="text-container-proprieties">
          {proprietati.descriere.map((val, index) => (
            <h2 key={index}>{val}</h2>
          ))}
        </div>
      </div>
      <div className="gallery-prop">
        <div className="gallery-left">
          <div className="line-prop" />
          <div className="proprieties-text">Proprietăți</div>
        </div>

        <div style={{ width: "fit-content" }}>
          <div className="gallery-right" id="galleryContainer">
            {images.map((proprietate, index) => (
              <Link to={proprietate.link} key={index}>
                <div className="image-container-prop" key={index}>
                  <img src={proprietate.imgSrc} alt="" />
                  <div className="image-text">
                    <p className="title-prop">{proprietate.textTitle}</p>
                    <p className="title-prop">{proprietate.textCase}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="background-overlay-prop"></div>
    </>
  );
}

export default Proprieties;
