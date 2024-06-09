import { Link } from "react-router-dom";
import "../CssPages/ZoneSibiu.css";
import mihaiViteazul from "../Images/m.png";
import centruistoric from "../Zone/zoneImg/piatamare.jpg";
import Stejari from "../Zone/zoneImg/treistejari.jpg";
import cedonia from "../Zone/zoneImg/cedonia.jpg";
import rahovei from "../Zone/zoneImg/rahovei.jpg";
import zone from "../Zone/zoneImg/toatezonele.webp";

function ZoneSibiu() {
  const zoneSibiu = [
    {
      id: 1,
      imgSrc: mihaiViteazul,
      titleZone: "Mihai Viteazul",
    },
    {
      id: 2,
      imgSrc: centruistoric,
      titleZone: "Centrul Istoric",
    },
    {
      id: 3,
      imgSrc: Stejari,
      titleZone: "Trei Stejari",
    },
    {
      id: 4,
      imgSrc: cedonia,
      titleZone: "Cedonia",
    },
    {
      id: 5,
      imgSrc: rahovei,
      titleZone: "Rahovei",
    },
    {
      id: 5,
      imgSrc: zone,
      titleZone: "Toate Zonele",
      route: "/zone",
    },
  ];

  return (
    <div className="zone-big-container">
      <div className="zone-prop">
        <div className="zone-left">
          <div className="line-zone" />
          <div className="zone-text">ZONE SIBIU</div>
        </div>

        <div style={{ width: "fit-content" }}>
          <div className="zone-right">
            {zoneSibiu.map((zona, index) => (
              <div className="zone-container" key={index}>
                {zona.route ? (
                  <Link to={zona.route}>
                    <img src={zona.imgSrc} alt={zona.titleZone} />
                    <div className="zone-text-container">
                      <h2 className="title-zone">{zona.titleZone}</h2>
                    </div>
                  </Link>
                ) : (
                  <>
                    <img src={zona.imgSrc} alt={zona.titleZone} />
                    <div className="zone-text-container">
                      <h2 className="title-zone">{zona.titleZone}</h2>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZoneSibiu;
