import "../CssPages/ZoneSibiu.css";
import mihaiViteazul from "../Images/mihai-viteazul.png";
import centru from "../Images/centru.jpg";
import Stejari from "../Images/3-stejari.jpg";
import cedonia from "../Images/cedonia.jpg";

function ZoneSibiu() {
  const zoneSibiu = [
    {
      id: 1,
      imgSrc: mihaiViteazul,
      titleZone: "Mihai Viteazul",
    },
    {
      id: 2,
      imgSrc: centru,
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
      imgSrc: mihaiViteazul,
      titleZone: "Mihai Viteazul",
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
                <img src={zona.imgSrc} alt="" />
                <div className="zone-text-container">
                  <h2 className="title-zone">{zona.titleZone}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZoneSibiu;
